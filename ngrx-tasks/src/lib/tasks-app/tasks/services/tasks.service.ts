import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { host, ITask, Task, TaskController } from '@codete-ngrx-quick-start/shared';
import { Store } from '@ngrx/store';
import { Resource, Rest } from "ng2-rest";
import { from, map, Observable, of } from 'rxjs';
import { Helpers } from 'tnp-core';
import { TasksInitialState } from '../tasks.models';

const tasks = 'tasks';
@Injectable()
export class TasksService {

  constructor(
    private httpClient: HttpClient,
  ) {

  }

  getAll() {
    //#region @websql
    if (Helpers.isWebSQL) {
      return Task.ctrl.getAll().received.observable.pipe(map(r => r.body.json))
    }
    //#endregion
    return this.httpClient.get<ITask[]>(`${host}/${tasks}/models`);
  }

  create(task: ITask) {
    //#region @websql
    if (Helpers.isWebSQL) {
      return Task.ctrl.create(task as Task).received.observable.pipe(map(r => r.body.json));
    }
    //#endregion
    return this.httpClient.post<ITask>(`${host}/${tasks}/model`, task);
  }

  update(task: ITask) {
    //#region @websql
    if (Helpers.isWebSQL) {
      return Task.ctrl.updateById(task?.id, task as any).received.observable.pipe(map(r => r.body.json));
    }
    //#endregion
    return this.httpClient.put<ITask>(`${host}/${tasks}/model/${task.id}`, task);
  }


  delete(task: ITask) {
    //#region @websql
    if (Helpers.isWebSQL) {
      return Task.ctrl.deleteById(task?.id).received.observable.pipe(map(r => r.body.json));
    }
    //#endregion
    return this.httpClient.delete<ITask>(`${host}/${tasks}/model/${task.id}`);
  }

}
