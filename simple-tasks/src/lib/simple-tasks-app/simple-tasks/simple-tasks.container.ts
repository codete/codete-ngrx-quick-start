import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import * as simpleTasksSelectors from './selectors/simple-tasks.selectors';
import * as simpleTasksActions from './actions/simple-tasks.actions';
import { SimpleTasksInitialState } from './simple-tasks.models';
import { SimpleTask } from '@codete-ngrx-quick-start/shared';
import { Observable, Subject } from 'rxjs';
import { Helpers } from 'tnp-helpers';



@Component({
  selector: 'app-simple-tasks',
  templateUrl: './simple-tasks.container.html',
  styleUrls: ['./simple-tasks.container.scss']
})
export class SimpleTasksContainer implements OnInit {
  destroy$ = new Subject();
  simpleTasks$ = this.store.select(simpleTasksSelectors.allSimpleTasks);

  constructor(
    private store: Store<SimpleTasksInitialState>

  ) {
    this.store.dispatch(simpleTasksActions.INIT());
  }

  ngOnInit() {
    this.store.dispatch(simpleTasksActions.REALTIME_CHANGES_SUBSCRIBE({
      destroy$: Helpers.ng.serialize(this.destroy$),
    }));
  }

  ngOnDestroy(): void {
    this.destroy$.next(void 0);
    this.destroy$.unsubscribe();
    Helpers.ng.unsubscribe(this.destroy$);
  }

  newTask(e: KeyboardEvent) {
    this.store.dispatch(simpleTasksActions.ADD_TASK({ task: SimpleTask.from(e.target['value']) }))
    e.target['value'] = ''
  }

  remove(task: SimpleTask) {
    this.store.dispatch(simpleTasksActions.DELETE_TASK({ task }))
  }

}
