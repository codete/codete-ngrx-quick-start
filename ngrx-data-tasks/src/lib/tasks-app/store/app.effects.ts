import { Injectable } from "@angular/core";
import { EntityOp } from "@ngrx/data";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ActionsSubject } from "@ngrx/store";
import { exhaustMap, map, skip, switchMap, tap, withLatestFrom } from "rxjs";
import { TasksEngineService } from "../engine/tasks-engine.service";
import * as appActions from './app.actions';

@Injectable()
export class AppEffects {

  constructor(
    private actions$: Actions,

    private engine: TasksEngineService,
  ) { }

  syncingDone = createEffect(() => this.actions$.pipe(
    ofType(appActions.SYNC_SUCCESS),
    map(() => {
      return appActions.SYNC_IDLE();
    })
  ))

}
