import { Firedev } from "firedev";
import { host, PATH_FOR } from "../constants";
import { TaskController } from "../task/task.controller";
import { SubTask } from "./subtask";

@Firedev.Controller({
  className: 'SubTaskController',
  entity: SubTask,
  path: PATH_FOR(SubTask),
})
export class SubTaskController extends Firedev.Base.Controller<SubTask> {

  saveAll<T = SubTask>(entites: T[]) {
    return this.bulkUpdate(entites as any).received.observable;
  }

  //#region @backend
  async initExampleDbData() {

    const repo = this.connection.getRepository<SubTask>(SubTask);
    await repo.save(SubTask.from({
      name: 'kabage',
      taskId: 1
    }));
    await repo.save(SubTask.from({
      name: 'berries',
      taskId: 1
    }));

    await repo.save(SubTask.from({
      name: 'check size',
      taskId: 2
    }));
    await repo.save(SubTask.from({
      name: 'create space',
      taskId: 2
    }));

    await repo.save(SubTask.from({
      name: 'paint outside',
      taskId: 2
    }));

    await repo.save(SubTask.from({
      name: 'tomato',
      taskId: 3,
    }));
    await repo.save(SubTask.from({
      name: 'peas',
      taskId: 3,
    }));

  }
  //#endregion

}
