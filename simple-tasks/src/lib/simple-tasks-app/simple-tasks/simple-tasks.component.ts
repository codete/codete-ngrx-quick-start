import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as simpleTasksSelectors from './selectors/simple-tasks.selectors';
import * as simpleTasksActions from './actions/simple-tasks.actions';
import { SimpleTasksInitialState } from './simple-tasks.models';

@Component({
  selector: 'app-simple-tasks',
  templateUrl: './simple-tasks.component.html',
  styleUrls: ['./simple-tasks.component.scss']
})
export class SimpleTasksComponent implements OnInit {

  $simpleTasks = this.store.select(simpleTasksSelectors.allSimpleTasks);
  constructor(
    private store: Store<SimpleTasksInitialState>

  ) { }

  ngOnInit() {
    this.store.dispatch(simpleTasksActions.INIT())
  }

}
