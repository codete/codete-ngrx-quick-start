
import { Firedev } from "firedev";
import { Process } from "./process";
import { Helpers } from 'tnp-helpers';
import { _, dateformat } from 'tnp-core';
//#region @backend
import { fse } from 'tnp-core';
import { ChildProcess } from "child_process";
import { ProcessState } from "./process.models";
//#endregion

@Firedev.Controller({
  className: 'ProcessController',
  entity: Process,
})
export class ProcessController extends Firedev.Base.Controller<Process>  {

  @Firedev.Http.GET('/start/process/:processId')
  start(@Firedev.Http.Param.Path('processId') processId: number): Firedev.Response<void> {
    //#region @websqlFunc
    return async (req, res) => {
      const repo = await this.connection.getRepository<Process>(Process);
      let process = await repo.findOneBy({ id: processId });

      if (process.state === 'active') {
        Helpers.warn('[ProcesController] process already stated')
        return;
      }

      process.state = 'starting'
      process.output = `${process.output}\n----- new session ${dateformat(new Date())} -----\n`;

      await repo.update(processId, process);

      const realProcess = Helpers.run(process.command).async(
        false,
        //#region @browser
        (async (stdout, stder, shouldProcesBeDead) => {
          for (let i = 1; i < 11; i++) {
            stdout(`\nPluszka`);
            await Helpers.wait(2)
            if (shouldProcesBeDead()) {
              return 0;
            }
          }
          return 0;
        })
        //#endregion
      );

      process.state = 'active';
      process.pid = realProcess.pid;
      console.log(`Starting child process with pid: ${realProcess.pid}`)
      await repo.update(processId, process);

      const updateProces = _.debounce(async (newData: string) => {
        process = await repo.findOneBy({ id: processId });

        if (!process.output) {
          process.output = '';
        }
        process.output = `${process.output}${newData}`;
        await repo.update(processId, process);
        Firedev.Realtime.Server.TrigggerEntityChanges(process);
      }, 500)

      realProcess.stdout.on('data', data => {
        updateProces(data);
      });

      realProcess.stderr.on('data', data => {
        updateProces(data);
      })

      /**
       * 15 - soft kill
       * 9 - hard kill
       * 1 - from code exit
       * 0 - process done
       */
      realProcess.on('exit', async (code, data) => {
        process.state = (code === 0) ? 'ended-ok' : 'ended-with-error';
        process.pid = void 0;
        await repo.update(processId, process);
        Firedev.Realtime.Server.TrigggerEntityChanges(process);
      });

    }
    //#endregion
  }


  @Firedev.Http.GET('/stop/process/:processId')
  stop(@Firedev.Http.Param.Path('processId') processId: number): Firedev.Response<void> {
    //#region @websqlFunc
    return async (req, res) => {
      const repo = await this.connection.getRepository<Process>(Process);
      let process = await repo.findOneBy({ id: processId });
      process.state = 'killing';
      console.log(`Killing child process with pid: ${process.pid}`)

      await repo.update(processId, process);
      Firedev.Realtime.Server.TrigggerEntityChanges(process);

      try {
        Helpers.killProcess(process.pid);
        console.info(`Process killed successfully (by pid = ${process.pid})`)
      } catch (error) {
        console.error(`Not able to kill process by pid ${process.pid}`)
      }

      process.state = 'killed';
      process.pid = void 0;
      await repo.update(processId, process);
    }
    //#endregion
  }

  //#region @websql
  async initExampleDbData() {

    const repo = this.connection.getRepository<Process>(Process);


    await repo.save(Process.from({
      command: 'firedev show:random:hamsters:types'
    }));

    await repo.save(Process.from({
      command: 'firedev show:random:hamsters'
    }));

    await repo.save(Process.from({
      command: 'firedev show:loop:messages'
    }));

    await repo.save(Process.from({
      command: 'firedev show:loop:messages --max 2'
    }));

    await repo.save(Process.from({
      command: 'firedev show:loop:messages --max 1 --err'
    }));

    await repo.save(Process.from({
      command: 'firedev show:loop:messages --max 1 --throw'
    }));


  }
  //#endregion

}
