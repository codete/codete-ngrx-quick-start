
import { Firedev } from "firedev";
import { Process } from "./process";
import { Helpers } from 'tnp-helpers';
import { _ } from 'tnp-core';
//#region @backend
import { fse } from 'tnp-core';
import { ChildProcess } from "child_process";
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

      const proc = Helpers.run(process.command, {
        // stdio: ['pipe', 'pipe', 'ignore']
      }).async();

      process.pid = proc.pid;
      await repo.update(processId, process);

      const updateProces = _.debounce(async (newData: string) => {
        process = await repo.findOne(processId);
        if (!process.stdout) {
          process.stdout = '';
        }
        process.stdout = `${process.stdout}${newData}`;
        process.state = 'active';
        await repo.update(processId, process);
        console.log(`it shoudl update trigger change ${process?.id}`, process)
        Firedev.Realtime.Server.TrigggerEntityChanges(process);
      }, 500)

      proc.stdout.on('data', data => {
        updateProces(data);
      });

      proc.stdout.on('end', async (code) => {
        process.state = 'ended-ok';
        process.pid = void 0;
        await repo.update(processId, process);
        Firedev.Realtime.Server.TrigggerEntityChanges(process);
      });

      proc.stdout.on('error', async (code) => {
        process.state = 'ended-with-error';
        process.pid = void 0;
        await repo.update(processId, process);
        Firedev.Realtime.Server.TrigggerEntityChanges(process);
      });

      return;
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
      Firedev.Realtime.Server.TrigggerEntityChanges(process);
    }
    //#endregion
  }

  //#region @backend
  async initExampleDbData() {

    const repo = this.connection.getRepository<Process>(Process);
    await repo.save(Process.from({
      command: 'firedev show_loop_messages'
    }));


    await repo.save(Process.from({
      command: 'firedev show:random:hamsters:types'
    }));

    await repo.save(Process.from({
      command: 'firedev show:random:hamsters'
    }));


  }
  //#endregion

}
