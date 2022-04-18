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
      this.service.getAll().received.observable.pipe(
        map(r => {
          return r.body.rawJson;
        }),
        map(tasks => {
          return tasksActions.FETCH_TASKS_SUCCESS({ tasks })
        })
      ))
  ));

  addTask = createEffect(() => this.actions$.pipe(
    ofType(tasksActions.ADD_TASK),
    switchMap((action) =>
      this.service.create(action.task as any).received.observable.pipe(
        map(r => r.body.rawJson),
        map(task => {
          return tasksActions.ADD_TASK_SUCCESS({ task })
          // @LAST
          // adding tasks in progress
        })
      ))
  ));

}
