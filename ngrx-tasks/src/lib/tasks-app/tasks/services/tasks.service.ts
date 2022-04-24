import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { host, ITask, Task, TaskController } from '@codete-ngrx-quick-start/shared';
import { Resource, Rest } from "ng2-rest";
import { from, Observable, of } from 'rxjs';

const tasks = 'tasks';
@Injectable()
export class TasksService  {

  constructor(
    private httpClient: HttpClient
  ) {

  }

  getAll() {
    return this.httpClient.get<ITask[]>(`${host}/${tasks}/models`);
  }


  create(subtask: ITask) {
    return this.httpClient.post<ITask>(`${host}/${tasks}/model`, subtask);
  }

}
