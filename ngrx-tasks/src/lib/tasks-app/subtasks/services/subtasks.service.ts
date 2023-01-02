import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { host, ISubTask, SubTask } from '@codete-ngrx-quick-start/shared';
import { map, Observable } from 'rxjs';
import { Helpers } from 'tnp-core';

const subtasks = 'subtasks';

@Injectable()
export class SubTasksService {

  constructor(
    private httpClient: HttpClient
  ) {

  }

  getAll(taskId: number) {
    //#region @websql
    if (Helpers.isWebSQL) {
      return SubTask.ctrl.getAll(taskId).received.observable.pipe(map(r => r.body.json));
    }
    //#endregion
    return this.httpClient.get<ISubTask[]>(`${host}/${subtasks}/models?taskId=${taskId}`);
  }

  create(subtask: ISubTask) {
    //#region @websql
    if (Helpers.isWebSQL) {
      return SubTask.ctrl.create(subtask as any).received.observable.pipe(map(r => r.body.json)) as any as Observable<ISubTask>;
    }
    //#endregion
    return this.httpClient.post<ISubTask>(`${host}/${subtasks}/model`, subtask);
  }

  update(subtask: ISubTask) {
    //#region @websql
    if (Helpers.isWebSQL) {
      return SubTask.ctrl.updateById(subtask?.id, subtask as any).received.observable.pipe(map(r => r.body.json)) as any as Observable<ISubTask>;
    }
    //#endregion
    return this.httpClient.put<ISubTask>(`${host}/${subtasks}/model/${subtask.id}`, subtask);
  }

  delete(subtask: ISubTask) {
    //#region @websql
    if (Helpers.isWebSQL) {
      return SubTask.ctrl.deleteById(subtask?.id).received.observable.pipe(map(r => r.body.json)) as any as Observable<ISubTask>;
    }
    //#endregion
    return this.httpClient.delete<ISubTask>(`${host}/${subtasks}/model/${subtask.id}`);
  }

}

