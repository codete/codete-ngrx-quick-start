import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as subtasksActions from '../actions/subtasks.actions'
import { switchMap, delay, map, of } from "rxjs";
import { SubTasksService } from '../services/subtasks.service';

@Injectable()
export class SubTasksEffects {
  constructor(private actions$: Actions, private service: SubTasksService) { }

  fetchSubTasks = createEffect(() => this.actions$.pipe(
    ofType(subtasksActions.FETCH_SUBTASKS),
    switchMap(() =>
      this.service.getAll().pipe(
        map(subtasks => {
          return subtasksActions.FETCH_SUBTASKS_SUCCESS({ subtasks })
        })
      ))
  ));

  addSubTask = createEffect(() => this.actions$.pipe(
    ofType(subtasksActions.ADD_SUBTASK),
    switchMap((action) =>
      this.service.create(action.subtask).pipe(
        map(subtask => {
          return subtasksActions.ADD_SUBTASK_SUCCESS({ subtask });
        })
      ))
  ));

}
