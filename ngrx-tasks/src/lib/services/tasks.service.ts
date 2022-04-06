import { Injectable } from '@angular/core';
import { Task } from '@codete-ngrx-quick-start/shared';
import { Resource, Rest } from "ng2-rest";
import { from, Observable } from 'rxjs';

@Injectable()
export class TasksService {
  constructor() { }

  load() {
    return from([
      Task.from({ name: 'test 1' }),
      Task.from({ name: 'test 2' }),
    ])
  }

}
