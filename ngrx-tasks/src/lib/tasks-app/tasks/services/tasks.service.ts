import { Injectable } from '@angular/core';
import { ITask, Task } from '@codete-ngrx-quick-start/shared';
import { Resource, Rest } from "ng2-rest";
import { from, Observable, of } from 'rxjs';

@Injectable()
export class TasksService {
  constructor() { }

  load() {
    return of<ITask[]>([
      { name: 'test 1', id: 1 },
      { name: 'test 2', id: 2 },
    ] as ITask[])
  }

}
