
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

  //#region @backend
  private proceses: { [procPid: string]: ChildProcess; } = {};
  //#endregion

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

      const proc = Helpers.run(process.command).async();
      this.proceses[proc.pid] = proc;

      const updateProces = _.debounce(async (newData: string) => {
        process = await repo.findOne(processId);
        if (!process.stdout) {
          process.stdout = '';
        }
        process.stdout = `${process.stdout}\n${newData}`;
        process.state = 'active';
        await repo.update(processId, process);
        Firedev.Realtime.Server.TrigggerEntityChanges(process);
      }, 500)

      proc.stdout.on('data', data => {
        console.log('should update process', data);
        updateProces(data);
      });

      proc.stdout.on('end', (code) => {
        setTimeout(async () => { // @ts-ignore
          console.log('process ended', arguments)

        });
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
      Helpers.killProcess(process.pid);
      process.state = 'killed';
      await repo.update(processId, process);
      Firedev.Realtime.Server.TrigggerEntityChanges(process);
    }
    //#endregion
  }

  //#region @backend
  async initExampleDbData() {

    const repo = this.connection.getRepository<Process>(Process);
    await repo.save(Process.from({
      command: 'firedev showloopmessages'
    }));

    await repo.save(Process.from({
      command: 'firedev show:random:hamsters'
    }));


  }
  //#endregion

}
