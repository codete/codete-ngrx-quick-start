
import { Firedev } from "firedev";
import { Helpers } from "tnp-helpers";
import { CLASS } from "typescript-class-helpers";
import { PATH_FOR } from "../constants";
import { Task } from "./task";
import { Models } from 'ng2-rest';
import { map } from "rxjs";

@Firedev.Controller({
  className: 'TaskController',
  entity: Task,
  path: PATH_FOR(Task),
})
export class TaskController extends Firedev.Base.Controller<Task> {

  saveAll<T = Task>(entites: T[]) {
    return this.bulkUpdate(entites as any).received.observable;
  }


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
      name: 'buy hamster food',
      isDone: true,
    }))

  }
  //#endregion

}
