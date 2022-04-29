import { AfterViewInit, Component, HostBinding, Inject, OnInit, Optional, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { SubTask, Task, TaskComponent } from '@codete-ngrx-quick-start/shared';
import * as _ from 'lodash';
import { BreakpointObserver } from '@angular/cdk/layout';
import { TasksEngineService } from '../../engine/tasks-engine.service';

/**
 * it is done for double click edit task name purpose
 */
const TASK_CLICK_WAIT_TIME = 200;
const CLICK_OMIT_EVENT = 2;

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks-ngrx-data.container.html',
  styleUrls: ['./tasks-ngrx-data.container.scss']
})
export class TasksContainer implements OnInit, AfterViewInit {

  @ViewChildren(TaskComponent) tasks: QueryList<TaskComponent>;
  @ViewChild('drawer') drawer?: MatDrawer;
  newTaskModel: string;
  toogled: Task;

  focusTriggered

  constructor(
    private engine: TasksEngineService,

    protected breakpointObserver: BreakpointObserver,
  ) { }
  tasks$ = this.engine.allTasksSelector(this);
  title$ = this.engine.title()
  isAddingTasks$ = this.engine.isProcessingTaskRequestSelector;

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

  ngAfterViewInit(): void {

  }

  async add(event: KeyboardEvent) {
    this.engine.addTaskAction(event, this);
  }

  onSave(isDone: boolean, task: Task) {
    this.engine.onSaveTaskAction({ isDone }, task);
  }

  onSaveName(name: string, task: Task) {
    this.engine.onSaveTaskAction({ name }, task);
  }

  focusFired = 0;
  focus() {
    this.focusFired = CLICK_OMIT_EVENT;
  }

  async toogle(event: Event, task: Task) {
    setTimeout(() => {
      if (this.focusFired > 0) {
        this.focusFired--;
        event.stopImmediatePropagation();
        event.stopPropagation();
        if (this.focusFired === 0) {
          const taskToFocus = this.tasks.find(t => t.task.id === task.id);
          taskToFocus.focusTriggered.next();
        }
      } else {
        this.engine.toogleSubtasksAction(event, task, this);
      }
    }, TASK_CLICK_WAIT_TIME)

  }
}
