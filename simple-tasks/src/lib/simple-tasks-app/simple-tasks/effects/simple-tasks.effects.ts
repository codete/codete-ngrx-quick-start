import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as simpleTasksActions from '../actions/simple-tasks.actions'
import { switchMap, map, of, exhaustMap, catchError, concatMap } from "rxjs";
import { SimpleTasksService } from '../services/simple-tasks.service';

@Injectable()
export class SimpleTasksEffects {
  constructor(private actions$: Actions, private service: SimpleTasksService) { }

  init = createEffect(() => this.actions$.pipe(
    ofType(simpleTasksActions.INIT),
    switchMap(() => of(simpleTasksActions.FETCH_ALL_TASKS()))
  ));

  fetchAllTasks = createEffect(() => this.actions$.pipe(
    ofType(simpleTasksActions.FETCH_ALL_TASKS),
    switchMap(() =>
      this.service.ctrl.getAll().received.observable.pipe(
        map(response => {
          return simpleTasksActions.FETCH_ALL_TASKS_SUCCESS({ simpleTasks: response.body.rawJson })
        }),
        catchError((error) => {
          this.service.handleError(error);
          return of(simpleTasksActions.FETCH_ALL_TASKS_ERROR({ error }));
        }),
      ))
  ));

  addTask = createEffect(() => this.actions$.pipe(
    ofType(simpleTasksActions.ADD_TASK),
    switchMap(({ task }) =>
      this.service.ctrl.create(task).received.observable.pipe(
        map(response => {
          return simpleTasksActions.ADD_TASK_SUCCESS({ task: response.body.rawJson })
        }),
        catchError((error) => {
          this.service.handleError(error);
          return of(simpleTasksActions.ADD_TASK_ERROR({ error }));
        }),
      ))
  ));

  deleteTask = createEffect(() => this.actions$.pipe(
    ofType(simpleTasksActions.DELETE_TASK),
    switchMap(({ task }) =>
      this.service.ctrl.deleteById(task.id).received.observable.pipe(
        map(response => {
          return simpleTasksActions.DELETE_TASK_SUCCESS({ task: response.body.rawJson })
        }),
        catchError((error) => {
          this.service.handleError(error);
          return of(simpleTasksActions.DELETE_TASK_ERROR({ error }));
        }),
      ))
  ));



}

