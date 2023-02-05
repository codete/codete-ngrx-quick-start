
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
        ((stdout, stder) => {
          _.times(10, (n) => {
            stdout(`Pluszka`);
          })
          return 0;
        })
        //#endregion
      );

      process.state = 'active';
      process.pid = realProcess.pid;
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
      await repo.update(processId, process);
      Firedev.Realtime.Server.TrigggerEntityChanges(process);
      //#region @backend
      try {
        Helpers.killProcess(process.pid);
      } catch (error) { }
      //#endregion
      //#region @browser
      await Helpers.wait(1)
      //#endregion
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
