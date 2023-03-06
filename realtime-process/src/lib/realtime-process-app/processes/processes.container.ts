//#region @browser
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProcessesInitialState } from './processes.models';
import * as processesActions from './actions/processes.actions';
import * as selectors from './selectors/processes.selectors';
import { Process } from '@codete-ngrx-quick-start/shared';
import { ProcessAction } from '@codete-ngrx-quick-start/shared';
import { Helpers } from 'tnp-helpers';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-processes',
  templateUrl: './processes.container.html',
  styleUrls: ['./processes.container.scss']
})
export class ProcessesContainer implements OnInit {
  destroy$ = new Subject();
  constructor(
    private store: Store<ProcessesInitialState>
  ) { }

  processes$ = this.store.select(selectors.allProceses);

  ngOnInit() {
    this.store.dispatch(processesActions.INIT());
  }

  ngOnDestroy(): void {
    this.destroy$.next(void 0);
    this.destroy$.unsubscribe();
    Helpers.ng.unsubscribe(this.destroy$);
  }
  onProcessRealtimeSubscribe(process: Process,) {
    this.store.dispatch((processesActions.REALTIME_CHANGES_SUBSCRIBE({
      process, destroy$: Helpers.ng.serialize(this.destroy$),
    })));
  }

  onProcessAction(action: ProcessAction, process: Process) {
    if (action === 'start') {
      this.store.dispatch(processesActions.START_PROCESS({ process }));
    }
    if (action === 'stop') {
      this.store.dispatch(processesActions.STOP_PROCESS({ process }));
    }

  }

  trackByMethod(index: number, process: Process): number {
    return process.id;
  }

}
//#endregion
