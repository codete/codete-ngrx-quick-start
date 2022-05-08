import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { host, ISubTask } from '@codete-ngrx-quick-start/shared';

const subtasks = 'subtasks';

@Injectable()
export class SubTasksService {

  constructor(
    private httpClient: HttpClient
  ) {

  }

  getAll(taskId: number) {
    return this.httpClient.get<ISubTask[]>(`${host}/${subtasks}/models?taskId=${taskId}`);
  }

  create(subtask: ISubTask) {
    return this.httpClient.post<ISubTask>(`${host}/${subtasks}/model`, subtask);
  }

  update(subtask: ISubTask) {
    return this.httpClient.put<ISubTask>(`${host}/${subtasks}/model/${subtask.id}`, subtask);
  }

  delete(subtask: ISubTask) {
    return this.httpClient.delete<ISubTask>(`${host}/${subtasks}/model/${subtask.id}`);
  }

}

