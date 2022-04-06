import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as tasksActions from '../actions/tasks.actions'
import { switchMap, delay, map } from "rxjs";
import { TasksService } from '../services/tasks.service';

@Injectable({
  providedIn: 'root'
})
export class TasksEffects {
  constructor(private actions$: Actions, private service: TasksService) { }

  init$ = this.actions$.pipe(
    ofType(tasksActions.FETCH_TASKS),
    switchMap(action =>
      this.service.load().pipe(
        delay(3000),
        map(data => tasksActions.FETCH_TASKS())
      ))
  );

}
