
import { Firedev } from "firedev";
import { Process } from "./process";
import { Helpers } from 'tnp-helpers';
import { _ } from 'tnp-core';
//#region @backend
import { fse, dateformat } from 'tnp-core';
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
    //#region @backendFunc
    return async (req, res) => {
      const repo = await this.connection.getRepository<Process>(Process);
      let process = await repo.findOne(processId);

      if (process.state === 'active') {
        Helpers.warn('[ProcesController] process already stated')
        return;
      }

      process.state = 'starting'
      process.output = `${process.output}\n----- new session ${dateformat(new Date())} -----\n`;

      await repo.update(processId, process);

      const proc = Helpers.run(process.command).async();

      process.state = 'active';
      process.pid = proc.pid;
      await repo.update(processId, process);

      const updateProces = _.debounce(async (newData: string) => {
        process = await repo.findOne(processId);

        if (!process.output) {
          process.output = '';
        }
        process.output = `${process.output}${newData}`;
        await repo.update(processId, process);
        Firedev.Realtime.Server.TrigggerEntityChanges(process);
      }, 500)

      proc.stdout.on('data', data => {
        updateProces(data);
      });

      proc.stderr.on('data', data => {
        updateProces(data);
      })

      proc.on('exit', async (code, data) => {
        process.state  = (code === 0) ? 'ended-ok': 'ended-with-error';
        process.pid = void 0;
        await repo.update(processId, process);
        Firedev.Realtime.Server.TrigggerEntityChanges(process);
      });

    }
    //#endregion
  }


  @Firedev.Http.GET('/stop/process/:processId')
  stop(@Firedev.Http.Param.Path('processId') processId: number): Firedev.Response<void> {
    //#region @backendFunc
    return async (req, res) => {
      const repo = await this.connection.getRepository<Process>(Process);
      let process = await repo.findOne(processId);
      process.state = 'killing';
      await repo.update(processId, process);
      Firedev.Realtime.Server.TrigggerEntityChanges(process);
      try {
        Helpers.killProcess(process.pid);
      } catch (error) { }
      process.state = 'killed';
      process.pid = void 0;
      await repo.update(processId, process);
    }
    //#endregion
  }

  //#region @backend
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
