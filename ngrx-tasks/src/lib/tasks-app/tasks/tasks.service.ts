import { Injectable } from '@angular/core';
import { TasksEngineService as BaseTasksEngineService } from '@codete-ngrx-quick-start/ngrx-data-tasks';


@Injectable()
export class TasksEngineService extends BaseTasksEngineService {

  helloWorld() {
    return 'Hello from ngrx application'
  }

}
