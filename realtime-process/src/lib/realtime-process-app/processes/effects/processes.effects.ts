

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as processesActions from '../actions/processes.actions'
import { switchMap, map, of, debounceTime, exhaustAll, exhaustMap } from "rxjs";
import { ProcessesService } from '../services/processes.service';
import { Firedev } from 'firedev';
import { Process } from '@codete-ngrx-quick-start/shared';

@Injectable()
export class ProcessEffects {
  constructor(private actions$: Actions, private service: ProcessesService) { }

  init = createEffect(() => this.actions$.pipe(
    ofType(processesActions.INIT),
    switchMap(() => of(processesActions.FETCH_PROCESSES()))
  ));

  fetchTasks = createEffect(() => this.actions$.pipe(
    ofType(processesActions.FETCH_PROCESSES),
    switchMap(() =>
      this.service.ctrl.getAll().received.observable.pipe(
        map(r => r.body.rawJson),
        map(processes => {
          return processesActions.FETCH_PROCESSES_SUCCESS({ processes })
        })
      ))
  ));

  startProcess = createEffect(() => this.actions$.pipe(
    ofType(processesActions.START_PROCESS),
    exhaustMap((action) => {
      return action.process.start().pipe(
        map(() => processesActions.START_PROCESS_SUCCESS())
      )
    })
  ));


  realtimeChanges = createEffect(() => this.actions$.pipe(
    ofType(processesActions.REALTIME_CHANGES_SUBSCRIBE),
    switchMap((action) => {
      return Firedev.Realtime.Browser.listenChangesEntityObj(action.proces).pipe(
        debounceTime(500),
        exhaustMap(() => {
          return Process.ctrl.getBy(action.proces.id).received.observable
            .pipe(map(r => r.body.rawJson))
        }),
        map(process => {
          return processesActions.REALTIME_CHANGES_NEW_DATA(process as any)
        })
      );
    })
  ));

}
