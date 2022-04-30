import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProcessesInitialState } from './processes.models';
import * as processesActions from './actions/processes.actions';
import * as selectors from './selectors/processes.selectors';
import { map } from 'rxjs';
import { Process } from '@codete-ngrx-quick-start/shared';

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

}
