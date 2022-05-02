

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as processesActions from '../actions/processes.actions'
import { switchMap, map, of, debounceTime, exhaustAll, exhaustMap, tap } from "rxjs";
import { ProcessesService } from '../services/processes.service';
import { Firedev } from 'firedev';
import { Process } from '@codete-ngrx-quick-start/shared';
import { Store } from '@ngrx/store';
import { ProcessesInitialState } from '../processes.models';

@Injectable()
export class ProcessEffects {
  constructor(
    private actions$: Actions,
    private service: ProcessesService,
    private store: Store<ProcessesInitialState>
  ) { }

  init = createEffect(() => this.actions$.pipe(
    ofType(processesActions.INIT),
    switchMap(() => of(processesActions.FETCH_PROCESSES()))
  ));

  fetchProcesses = createEffect(() => this.actions$.pipe(
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
    tap((action) => {
      this.store.dispatch(processesActions.UPDATE_PROCESS({
        process: {
          id: action.process.id,
          changes: {
            state: 'starting'
          }
        }
      }));
    }),
    exhaustMap((action) => {
      return action.process.start().pipe(
        map(() => processesActions.START_PROCESS_SUCCESS())
      )
    })
  ));


  realtimeChanges = createEffect(() => this.actions$.pipe(
    ofType(processesActions.REALTIME_CHANGES_SUBSCRIBE),
    switchMap((action) => {
      return Firedev.Realtime.Browser.listenChangesEntityObj(action.process).pipe(
        debounceTime(500),
        exhaustMap(() => {
          return Process.ctrl.getBy(action.process.id).received.observable
            .pipe(map(r => r.body.rawJson))
        }),
        map(process => {
          return processesActions.REALTIME_CHANGES_NEW_DATA(process as any)
        })
      );
    })
  ));

}
