import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TasksInitialState } from '../../tasks.models';
import * as tasksSelectors from '../../selectors/tasks.selectors';
import * as tasksAction from '../../actions/tasks.actions';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-tasks-container',
  templateUrl: './tasks-container.component.html',
  styleUrls: ['./tasks-container.component.scss']
})
export class TasksContainerComponent implements OnInit {
  constructor(
    private store: Store<TasksInitialState>
  ) { }

  tasks$ = this.store.select(tasksSelectors.allTaks);

  ngOnInit() {
    this.store.dispatch(tasksAction.INIT());
  }


  async add(event: KeyboardEvent) {
    if (event.code === 'Enter') {
      this.store.dispatch(tasksAction.ADD_TASK({
        task: { name: event.target['value'] }
      }));
    }
  }

}
