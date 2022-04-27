import { AfterViewInit, Component, HostBinding, Inject, OnInit, Optional, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { SubTask, Task } from '@codete-ngrx-quick-start/shared';
import * as _ from 'lodash';
import { BreakpointObserver } from '@angular/cdk/layout';
import { TasksEngineService } from '../../engine/tasks-engine.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks-ngrx-data.container.html',
  styleUrls: ['./tasks-ngrx-data.container.scss']
})
export class TasksContainer implements OnInit, AfterViewInit {

  @ViewChild('drawer') drawer?: MatDrawer;
  newTaskModel: string;
  toogled: Task;
  constructor(
    private engine: TasksEngineService,

    protected breakpointObserver: BreakpointObserver,
  ) { }
  tasks$ = this.engine.allTasksSelector(this);
  title$ = this.engine.title()

  async ngOnInit() {
    this.engine.initAction(this);
  }

  async onRemoveTask(taskId: number) {
    this.drawer?.close();
    this.engine.removeTaskAction(taskId);
  }

  async onRemoveSubTask(subtask: SubTask) {
    this.engine.removeSubTaskAction(subtask);
  }

  onCloseSubtaskMenu() {
    this.drawer?.close();
  }

  ngAfterViewInit(): void { }

  async add(event: KeyboardEvent) {
    this.engine.addTaskAction(event, this);
  }

  onSave(isDone: boolean, task: Task) {
    this.engine.onSaveTaskAction(isDone, task, this);
  }

  async toogle(event: Event, task: Task) {
    this.engine.toogleSubtasksAction(event, task, this);
  }
}
