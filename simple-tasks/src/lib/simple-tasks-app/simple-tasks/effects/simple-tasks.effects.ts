//#region @browser
import { Injectable } from '@angular/core';
import { Actions, createEffect, EffectNotification, ofType } from '@ngrx/effects';
import * as simpleTasksActions from '../actions/simple-tasks.actions';
import * as simpleTaskSelectors from '../selectors/simple-tasks.selectors';
import { switchMap, map, of, exhaustMap, catchError, concatMap, mergeMap, debounceTime, Observable, takeUntil, withLatestFrom } from "rxjs";
import { SimpleTasksService } from '../services/simple-tasks.service';
import { Firedev } from 'firedev';
import { SimpleTask } from '@codete-ngrx-quick-start/shared';
import { _ } from 'tnp-core';
import { Helpers } from 'tnp-helpers';
import { Store } from '@ngrx/store';
import { SimpleTasksInitialState } from '../simple-tasks.models';

@Injectable()
export class SimpleTasksEffects {
  constructor(private actions$: Actions, private service: SimpleTasksService, private store: Store<SimpleTasksInitialState>) { }

  init = createEffect(() => this.actions$.pipe(
    ofType(simpleTasksActions.INIT),
    switchMap(() => of(simpleTasksActions.FETCH_ALL_TASKS()))
  ));

  fetchAllTasks = createEffect(() => this.actions$.pipe(
    ofType(simpleTasksActions.FETCH_ALL_TASKS, simpleTasksActions.ORDER_LOVE_FIRST),
    withLatestFrom(this.store.select(simpleTaskSelectors.loveFirstEnable)),
    switchMap(([action, loveFirst]) => {
      return this.service.ctrl.getAll(loveFirst).received.observable.pipe(
        map(response => {
          return simpleTasksActions.FETCH_ALL_TASKS_SUCCESS({ simpleTasks: response.body.rawJson })
        }),
        catchError((error) => {
          this.service.handleError(error);
          return of(simpleTasksActions.FETCH_ALL_TASKS_ERROR({ error }));
        }),
      )
    })
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

  loveTask = createEffect(() => this.actions$.pipe(
    ofType(simpleTasksActions.LOVE_TASK),
    switchMap(({ task }) =>
      this.service.ctrl.updateLove(task.id, true).received.observable.pipe(
        map(response => {
          return simpleTasksActions.LOVE_TASK_SUCCESS({ task: response.body.rawJson })
        }),
        catchError((error) => {
          this.service.handleError(error);
          return of(simpleTasksActions.LOVE_TASK_ERROR({ error }));
        }),
      ))
  ));

  unloveTask = createEffect(() => this.actions$.pipe(
    ofType(simpleTasksActions.UNLOVE_TASK),
    switchMap(({ task }) =>
      this.service.ctrl.updateLove(task.id, false).received.observable.pipe(
        map(response => {
          return simpleTasksActions.UNLOVE_TASK_SUCCESS({ task: response.body.rawJson })
        }),
        catchError((error) => {
          this.service.handleError(error);
          return of(simpleTasksActions.UNLOVE_TASK_ERROR({ error }));
        }),
      ))
  ));


  realtimeChanges = createEffect(() => this.actions$.pipe(
    ofType(simpleTasksActions.REALTIME_CHANGES_SUBSCRIBE),
    mergeMap((action) => {
      return Firedev.Realtime.Browser.listenChangesTableEntity(SimpleTask).pipe(
        takeUntil(Helpers.ng.deserialize(action.destroy$)),
        debounceTime(500),
        withLatestFrom(this.store.select(simpleTaskSelectors.loveFirstEnable)),
        exhaustMap(([action, loveFirst]) => {
          // TODO compare versions
          return this.service.ctrl.getAll(loveFirst).received.observable
            .pipe(map(r => r.body.rawJson))
        }),
        map(simpleTasks => {
          return simpleTasksActions.FETCH_ALL_TASKS_SUCCESS({ simpleTasks });
        }),
      );
    })
  ));

}

//#endregion
