
import * as _ from 'lodash';
import { Injectable, InjectionToken, Type } from '@angular/core';
import { SubTask, Task } from '@codete-ngrx-quick-start/shared';
import { combineLatest, concatMap, delay, firstValueFrom, map, of, take, withLatestFrom } from 'rxjs';
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

  title() {
    return of('HAMSTERS TASKS ("ngrx/data" application)')
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
    if (event.code === 'Enter' && context.newTaskModel) {
      await firstValueFrom(this.tasksService.add(Task.from({
        name: context.newTaskModel
      })));
      context.newTaskModel = '';
    }
  }
  //#endregion

  //#region actions / add sub task
  async addSubTaskAction(event: KeyboardEvent, context: SubtasksComponent) {
    event.stopImmediatePropagation();
    event.stopPropagation();
    if (event.code === 'Enter' && context.tempSubtask) {
      const subtaskInstance = SubTask.from({
        name: context.tempSubtask,
        taskId: context.taskId,
      });
      const subtask = _.cloneDeep(subtaskInstance);
      await firstValueFrom(this.subtasksService.add(subtask));
      context.tempSubtask = '';
    }
  }
  //#endregion

  //#region actions / remove task
  async removeTaskAction(taskId: number) {
    const tasks = await firstValueFrom(this.tasksService.entities$);
    const task = tasks.find(t => t.id === taskId);
    this.tasksService.delete(_.cloneDeep(task))
  }
  //#endregion

  //#region actions / remove task
  async removeSubTaskAction(subtask: SubTask) {
    this.subtasksService.delete(_.cloneDeep(subtask));
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

  //#endregion

  saveAll() {
    return this.tasksService.entities$.pipe(
      map(c => c.map(t => Task.from(t))),
      withLatestFrom(this.subtasksService.entities$.pipe(map(c => c.map(t => SubTask.from(t))))),
      concatMap(([tasks, subtasks]) => {
        console.log({ tasks, subtasks })
        return combineLatest([
          Task.saveAll(tasks).pipe(
            map(c => {
              const newTasks = c.body.rawJson;
              // this.tasksService.updateManyInCache(newTasks);
              return newTasks;
            })),
          SubTask.saveAll(subtasks).pipe(
            map(c => {
              const newSubtasks = c.body.rawJson;
              // this.subtasksService.updateManyInCache(newSubtasks);
              return newSubtasks;
            })),
        ])
      })
    );
  }

}
