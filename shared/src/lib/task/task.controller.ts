
import { Firedev } from "firedev";
import { Task } from "./task";

@Firedev.Controller({
  className: 'TaskController',
  entity: Task,
  path: 'tasks'
})
export class TaskController extends Firedev.Base.Controller<Task> {


  //#region @backend
  async initExampleDbData() {

    const repo = this.connection.getRepository<Task>(Task);
    await repo.save(Task.from({
      name: 'feed hamster',
    }))
    await repo.save(Task.from({
      name: 'new hamster cage',
    }))

    await repo.save(Task.from({
      name: 'buy hasmter food',
      isDone: true,
    }))

  }
  //#endregion

}
