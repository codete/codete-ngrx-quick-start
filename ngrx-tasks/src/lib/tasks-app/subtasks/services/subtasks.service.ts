import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { host, ISubTask, ITask, Task, TaskController } from '@codete-ngrx-quick-start/shared';
import { Resource, Rest } from "ng2-rest";
import { from, Observable, of } from 'rxjs';


const subtasks = 'subtasks';

@Injectable()
export class SubTasksService {

  constructor(
    private httpClient: HttpClient
  ) {

  }

  getAll() {
    return this.httpClient.get<ISubTask[]>(`${host}/${subtasks}/models`);
  }


  create(subtask: ISubTask) {
    return this.httpClient.post<ISubTask>(`${host}/${subtasks}/model`, subtask);
  }

}

