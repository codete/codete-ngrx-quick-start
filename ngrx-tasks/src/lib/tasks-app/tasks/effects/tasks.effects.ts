import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as tasksActions from '../actions/tasks.actions'
import { switchMap, map, of, exhaustMap, catchError } from "rxjs";
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
      this.service.getAll().pipe(
        map(tasks => {
          return tasksActions.FETCH_TASKS_SUCCESS({ tasks })
        }),
        catchError((error) => {
          return of(tasksActions.FETCH_TASKS_ERROR({ error }));
        }),
      ))
  ));

  addTask = createEffect(() => this.actions$.pipe(
    ofType(tasksActions.ADD_TASK),
    exhaustMap((action) =>
      this.service.create(action.task).pipe(
        map(task => {
          return tasksActions.ADD_TASK_SUCCESS({ task });
        }),
        catchError((error) => {
          return of(tasksActions.ADD_TASK_ERROR({ error }));
        }),
      ))
  ));

  updateTask = createEffect(() => this.actions$.pipe(
    ofType(tasksActions.UPDATE_TASK_SUCCESS),
    exhaustMap((action) =>
      this.service.update(action.task).pipe(
        map(task => {
          return tasksActions.UPDATE_TASK_SUCCESS({ task });
        }),
        catchError((error) => {
          return of(tasksActions.UPDATE_TASK_ERROR({ error }));
        }),
      ))
  ));

  deleteTask = createEffect(() => this.actions$.pipe(
    ofType(tasksActions.DELETE_TASK),
    exhaustMap((action) =>
      this.service.delete(action.task).pipe(
        map(task => {
          return tasksActions.DELETE_TASK_SUCCESS({ task });
        }),
        catchError((error) => {
          return of(tasksActions.DELETE_TASK_ERROR({ error }));
        }),
      ))
  ));

}
