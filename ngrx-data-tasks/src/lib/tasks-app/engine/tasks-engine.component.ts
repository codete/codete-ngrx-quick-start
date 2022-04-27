import { Component, OnInit } from '@angular/core';
import { ActionsSubject } from '@ngrx/store';
import { skip } from 'rxjs';
import { TasksEngineService } from './tasks-engine.service';

@Component({
  selector: 'app-tasks-engine',
  templateUrl: './tasks-engine.component.html',
  styleUrls: ['./tasks-engine.component.scss']
})
export class TasksEngineComponent implements OnInit {

  message?: string;
  constructor(
    private engine: TasksEngineService,
    private actionListener$: ActionsSubject,
  ) { }

  ngOnInit() {
    this.message = this.engine.helloWorld();
    this.actionListener$.pipe(
      skip(1) // optional: skips initial logging done by ngrx
    ).subscribe((action) => console.info('ngrx action', action));
  }

}
