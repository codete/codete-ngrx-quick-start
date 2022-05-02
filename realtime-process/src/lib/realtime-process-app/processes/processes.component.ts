import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProcessesInitialState } from './processes.models';
import * as processesActions from './actions/processes.actions';
import * as selectors from './selectors/processes.selectors';
import { distinctUntilChanged, map, Observable, Subject, tap } from 'rxjs';
import { Process } from '@codete-ngrx-quick-start/shared';
import { ProcessAction } from '@codete-ngrx-quick-start/shared/process/process.models';

@Component({
  selector: 'app-processes',
  templateUrl: './processes.component.html',
  styleUrls: ['./processes.component.scss']
})
export class ProcessesComponent implements OnInit {
  constructor(
    private store: Store<ProcessesInitialState>
  ) { }

  processes$ = this.store.select(selectors.allProceses);

  ngOnInit() {
    this.store.dispatch(processesActions.INIT());
  }

  onProcessRealtimeSubscribe(process: Process,) {
    this.store.dispatch((processesActions.REALTIME_CHANGES_SUBSCRIBE({
      process,
    })));
  }

  onProcessAction(action: ProcessAction, process: Process) {
    if (action === 'start') {
      this.store.dispatch(processesActions.START_PROCESS({ process }));
    }
    if (action === 'stop') {

    }

  }

}
