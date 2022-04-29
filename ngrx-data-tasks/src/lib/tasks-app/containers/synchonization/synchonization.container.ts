import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { InitalAppState, InitalStoreState } from '../../store/app.models';
import { map } from 'rxjs';
import { TasksEngineService } from '../../engine/tasks-engine.service';

@Component({
  selector: 'app-synchonization',
  templateUrl: './synchonization.container.html',
  styleUrls: ['./synchonization.container.scss']
})
export class SynchonizationComponent {
  constructor(
    private engine: TasksEngineService,
  ) { }

  state$ = this.engine.synchonizationSateSelector();

}
