import { Injectable } from "@angular/core";
import { EntityOp } from "@ngrx/data";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ActionsSubject } from "@ngrx/store";
import { delay, exhaustMap, map, skip, switchMap, tap, withLatestFrom } from "rxjs";
import { TasksEngineService } from "../engine/tasks-engine.service";
import * as appActions from './app.actions';

@Injectable()
export class AppEffects {

  constructor(
    private actions$: Actions,

    private engine: TasksEngineService,
  ) { }

  syncAll = createEffect(() => this.actions$.pipe(
    ofType(appActions.SYNC),
    tap(() => {
      console.log('should trigger exhause mpa')
    }),
    delay(1000),
    switchMap(() => { // this should be exhause map
      console.log('Syncing')
      return this.engine.saveAll().pipe(
        map(([tasks, subtasks]) => {
          return appActions.SYNC_SUCCESS({
            tasks,
            subtasks,
          })
        })
      )
    }),
  ));

  syncingDone = createEffect(() => this.actions$.pipe(
    ofType(appActions.SYNC_SUCCESS),
    delay(2000),
    map(() => {
      return appActions.SYNC_IDLE();
    })
  ))

}
