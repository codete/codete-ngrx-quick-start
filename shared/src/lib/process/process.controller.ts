
import { Firedev } from "firedev";
import { Process } from "./process";

@Firedev.Controller({
  className: 'ProcessController',
  entity: Process,
})
export class ProcessController extends Firedev.Base.Controller<Process>  {

  //#region @backend
  async initExampleDbData() {

    const repo = this.connection.getRepository<Process>(Process);
    await repo.save(Process.from({
      command: 'firedev showloopmessages'
    }));

  }
  //#endregion

}
