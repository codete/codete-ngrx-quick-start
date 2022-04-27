import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { InitalAppState, InitalStoreState } from '../../store/app.models';
import * as appActions from '../../store/app.actions';
import { map } from 'rxjs';

@Component({
  selector: 'app-synchonization',
  templateUrl: './synchonization.container.html',
  styleUrls: ['./synchonization.container.scss']
})
export class SynchonizationComponent {
  constructor(
    private store: Store<InitalStoreState>
  ) { }

  state$ = this.store.pipe(map(s => { // TODO QUICK_FIX selector hould be better
    return s?.appConfig?.syncState;
  }))

  startSync() {
    this.store.dispatch(appActions.SYNC())
  }
}
