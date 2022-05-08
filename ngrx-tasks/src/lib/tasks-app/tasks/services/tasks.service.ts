import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { host, ITask, Task, TaskController } from '@codete-ngrx-quick-start/shared';
import { Store } from '@ngrx/store';
import { Resource, Rest } from "ng2-rest";
import { from, Observable, of } from 'rxjs';
import { TasksInitialState } from '../tasks.models';

const tasks = 'tasks';
@Injectable()
export class TasksService {

  constructor(
    private httpClient: HttpClient,
    private stor: Store<TasksInitialState>
  ) {

  }

  getAll() {
    return this.httpClient.get<ITask[]>(`${host}/${tasks}/models`);
  }

  create(task: ITask) {
    return this.httpClient.post<ITask>(`${host}/${tasks}/model`, task);
  }

  update(task: ITask) {
    return this.httpClient.put<ITask>(`${host}/${tasks}/model/${task.id}`, task);
  }


  delete(task: ITask) {
    return this.httpClient.delete<ITask>(`${host}/${tasks}/model/${task.id}`);
  }

}
