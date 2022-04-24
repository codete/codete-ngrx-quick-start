import { Component, OnInit } from '@angular/core';
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
  ) { }

  ngOnInit() {
    this.message = this.engine.helloWorld();
  }

}
