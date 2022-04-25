
import * as _ from 'lodash';
import { Injectable, InjectionToken, Type } from '@angular/core';
import { SubTask, Task } from '@codete-ngrx-quick-start/shared';
import { firstValueFrom } from 'rxjs';
import type { TasksContainer } from '../containers/tasks-ngrx-data/tasks-ngrx-data.container';
import type { SubtasksComponent } from '../containers/subtasks/subtasks.container';
import { SubtasksService } from '../services/subtasks.service';
import { TasksService } from '../services/tasks-ngrx-data.service';

export interface TasksEngineConfig {
  customEngineService: Type<TasksEngineService>;
}

@Injectable()
export class TasksEngineService {

  constructor(
    private subtasksService: SubtasksService,
    private tasksService: TasksService,
  ) {

  }

  helloWorld() {
    return 'Hello from ngrx/data application'
  }


  //#region selectors

  //#region selectors / get all tasks
  allTasksSelector(context: TasksContainer) {
    return this.tasksService.entities$;
  }
  //#endregion

  //#region selector / get subtasks for task
  allSubtasks(context: SubtasksComponent) {
    return this.subtasksService.entities$;
  }
  //#endregion

  //#endregion


  //#region actions

  //#region actions / init tasks
  initAction(context: TasksContainer) {
    this.tasksService.getAll();
  }
  //#endregion

  //#region actions / init subtasks
  fetchSubtaskAction() {
    this.subtasksService.getAll();
  }
  //#endregion

  //#region actions / add task
  async addTaskAction(event: KeyboardEvent, context: TasksContainer) {
    if (event.code === 'Enter') {
      await firstValueFrom(this.tasksService.add(Task.from({
        name: context.newTaskModel
      })));
      context.newTaskModel = '';
    }
  }
  //#endregion

  //#region actions / save task locally
  onSaveTaskAction(isDone: boolean, task: Task, context: TasksContainer) {
    task = _.cloneDeep(task) as Task;
    task.isDone = isDone;
    console.log({ isDone })
    this.tasksService.updateOneInCache(task);
  }
  //#endregion

  //#region actions / toogle subtasks for task
  toogleSubtasksAction(event: Event, task: Task, context: TasksContainer) {
    context.toogled = task;
    setTimeout(async () => {
      task = _.cloneDeep(task) as Task;
      task.selected = !task.selected;
      this.tasksService.updateManyInCache(
        (await firstValueFrom(this.tasksService.entities$)).map(t => {
          t = _.cloneDeep(t) as Task;
          t.selected = false;
          return t;
        })
      );
      if (task.selected) {
        this.tasksService.updateOneInCache(task);
        context.drawer?.open();
      } else {
        context.drawer?.close();
      }
      event.stopPropagation();
    });
  }
  //#endregion


  saveSubtaskAction(subtask: SubTask, context: SubtasksComponent) {

  }

}
