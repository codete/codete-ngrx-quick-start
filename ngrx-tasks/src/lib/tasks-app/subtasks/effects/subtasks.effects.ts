import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as subtasksActions from '../actions/subtasks.actions'
import { switchMap, delay, map, of, catchError } from "rxjs";
import { SubTasksService } from '../services/subtasks.service';

@Injectable()
export class SubTasksEffects {
  constructor(private actions$: Actions, private service: SubTasksService) { }

  fetchSubTasks = createEffect(() => this.actions$.pipe(
    ofType(subtasksActions.FETCH_SUBTASKS),
    switchMap((action) =>
      this.service.getAll(action.taskId).pipe(
        map(subtasks => {
          return subtasksActions.FETCH_SUBTASKS_SUCCESS({ subtasks })
        }),
        catchError((error) => {
          return of(subtasksActions.FETCH_SUBTASKS_ERROR({ error }))
        }),
      ))
  ));

  addSubTask = createEffect(() => this.actions$.pipe(
    ofType(subtasksActions.ADD_SUBTASK),
    switchMap((action) =>
      this.service.create(action.subtask).pipe(
        map(subtask => {
          return subtasksActions.ADD_SUBTASK_SUCCESS({ subtask });
        }),
        catchError((error) => {
          return of(subtasksActions.ADD_SUBTASK_ERROR({ error }))
        }),
      ))
  ));

  updateSubTask = createEffect(() => this.actions$.pipe(
    ofType(subtasksActions.UPDATE_SUBTASK),
    switchMap((action) =>
      this.service.update(action.subtask).pipe(
        map(subtask => {
          return subtasksActions.UPDATE_SUBTASK_SUCCESS({ subtask });
        }),
        catchError((error) => {
          return of(subtasksActions.UPDATE_SUBTASK_ERROR({ error }))
        }),
      ))
  ));

  deleteSubTask = createEffect(() => this.actions$.pipe(
    ofType(subtasksActions.DELETE_SUBTASK),
    switchMap((action) =>
      this.service.delete(action.subtask).pipe(
        map(subtask => {
          return subtasksActions.DELETE_SUBTASK_SUCCESS({ subtask });
        }),
        catchError((error) => {
          return of(subtasksActions.DELETE_SUBTASK_ERROR({ error }))
        }),
      ))
  ));


}
