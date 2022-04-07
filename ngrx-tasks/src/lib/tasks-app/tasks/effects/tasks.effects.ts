import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as tasksActions from '../actions/tasks.actions'
import { switchMap, delay, map, of } from "rxjs";
import { TasksService } from '../services/tasks.service';

@Injectable()
export class TasksEffects {
  constructor(private actions$: Actions, private service: TasksService) { }

  init = createEffect(() => this.actions$.pipe(
    ofType(tasksActions.INIT),
    switchMap(() => of(tasksActions.FETCH_TASKS()))
  ));

  fetchTasks = createEffect(() => this.actions$.pipe(
    ofType(tasksActions.FETCH_TASKS),
    switchMap(() =>
      this.service.load().pipe(
        delay(1000),
        map(tasks => {
          return tasksActions.FETCH_TASKS_SUCCESS({ tasks })
        })
      ))
  ));

}
