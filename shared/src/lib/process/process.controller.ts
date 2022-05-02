
import { Firedev } from "firedev";
import { Process } from "./process";
import { Helpers } from 'tnp-helpers';
import { _ } from 'tnp-core';
//#region @backend
import { fse } from 'tnp-core';
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
      const proc = Helpers.run(process.command).async();

      const updateProces = _.debounce(async (newData: string) => {
        process = await repo.findOne(processId);
        if (!process.stdout) {
          process.stdout = '';
        }
        process.stdout = `${process.stdout}\n${newData}`;
        await repo.update(processId, process);
        Firedev.Realtime.Server.TrigggerEntityChanges(process);
      }, 500)

      proc.stdout.on('data', data => {
        updateProces(data);
      });
      return;
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
