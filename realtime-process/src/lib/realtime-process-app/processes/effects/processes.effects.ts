

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as processesActions from '../actions/processes.actions'
import { switchMap, map, of } from "rxjs";
import { ProcessesService } from '../services/processes.service';

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

}
