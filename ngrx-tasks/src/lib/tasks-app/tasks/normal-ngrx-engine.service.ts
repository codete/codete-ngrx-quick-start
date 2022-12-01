//#region @browser
import { _ } from 'tnp-core';
import { Injectable } from '@angular/core';
import { TasksEngineService } from '@codete-ngrx-quick-start/ngrx-data-tasks';
import type { SubtasksComponent } from '@codete-ngrx-quick-start/ngrx-data-tasks';
import type { TasksContainer } from '@codete-ngrx-quick-start/ngrx-data-tasks';
import { Task, ISubTask, SubTask, ITask } from '@codete-ngrx-quick-start/shared';
import { Store } from '@ngrx/store';
import { firstValueFrom, Observable, of } from 'rxjs';
import { TasksInitialState } from './tasks.models';
import * as tasksSelectors from './selectors/tasks.selectors';
import * as tasksActions from './actions/tasks.actions';
import * as subtasksSelectors from '../subtasks/selectors/subtasks.selectors';
import * as subtasksActions from '../subtasks/actions/subtasks.actions';
import { SyncState } from '@codete-ngrx-quick-start/ngrx-data-tasks';

type UnwanterServices = 'subtasksService' | 'tasksService';
@Injectable()
export class NormalNgrxEngineService
  implements Omit<TasksEngineService, UnwanterServices> {
  //#region constructor
  constructor(private store: Store<TasksInitialState>) { }
  //#endregion
  //#region helpers
  helloWorld() {
    return 'Hello from standard ngrx application'
  }

  title() {
    return of('TASKS (standard ngrx application)')
  }
  //#endregion

  //#region selectors
  //#region selectors / is processing subtasks
  get isProcessingSubtaskRequestSelector(): Observable<boolean> | Store<boolean> {
    return of(false); // TODO
  }
  //#endregion
  //#region selectors / is processing subtasks
  get isProcessingTaskRequestSelector(): Observable<boolean> | Store<boolean> {
    return of(false); // TODO
  }
  //#endregion
  //#region selectors / get all tasks
  allTasksSelector(): Observable<Task[]> | Store<Task[]> {
    return this.store.select(tasksSelectors.allTasks) as any;
  }
  //#endregion
  //#region selectors / get subtasks for task
  allSubtasks(context: SubtasksComponent): Observable<ISubTask[]> | Store<ISubTask[]> {
    return this.store.select(subtasksSelectors.allSubTasks) as any;
  }
  //#endregion
  //#endregion

  //#region actions
  //#region actions / synchronize
  synchonizationSateSelector(): Observable<SyncState> {
    return of('idle'); // TODO
  }
  //#endregion
  //#region actions / init
  initAction() {
    this.store.dispatch(tasksActions.INIT());
  }
  //#endregion
  //#region actions / add task
  async addTaskAction(event: KeyboardEvent, context: TasksContainer): Promise<void> {
    if (event.code === 'Enter') {
      if (context.newTaskModel) {
        this.store.dispatch(tasksActions.ADD_TASK({
          task: {
            name: context.newTaskModel
          }
        }));
      }
      context.newTaskModel = '';
    }
  }
  //#endregion
  //#region actions / remove task
  removeTaskAction(taskId: number) {
    this.store.dispatch(tasksActions.DELETE_TASK({
      task: { id: taskId } as any
    }));
  }
  //#endregion
  //#region actions / save task
  onSaveTaskAction(updatedProps: Partial<ITask>, task: Task) {
    task = _.cloneDeep(task) as Task;
    _.merge(task, updatedProps);
    this.store.dispatch(tasksActions.UPDATE_TASK_SUCCESS({ task }));
  }
  //#endregion
  //#region actions / fetch subtasks
  fetchSubtaskAction(taskId: number): void {
    this.store.dispatch(subtasksActions.FETCH_SUBTASKS({ taskId }));
  }
  //#endregion
  //#region actions / add subtask
  addSubTaskAction(event: KeyboardEvent, context: SubtasksComponent) {
    event.stopImmediatePropagation();
    event.stopPropagation();
    if (event.code === 'Enter' && context.tempSubtask) {
      const subtaskInstance = SubTask.from({
        name: context.tempSubtask,
        taskId: context.taskId,
      });
      const subtask = _.cloneDeep(subtaskInstance) as ISubTask;
      if (subtask && Object.keys(subtask).length > 0) {
        this.store.dispatch(subtasksActions.ADD_SUBTASK({ subtask }));
      }
      context.tempSubtask = '';
    }
  }
  //#endregion
  //#region actions / remove subtask
  removeSubTaskAction(subtask: SubTask) {
    this.store.dispatch(subtasksActions.DELETE_SUBTASK({ subtask: subtask as any }));
  }
  //#endregion
  //#region actions / save subtask
  onSaveSubTaskAction(updatedProps: Partial<ISubTask>, subtask: SubTask): void {
    this.store.dispatch(subtasksActions.UPDATE_SUBTASK({ subtask: _.merge(_.clone(subtask), updatedProps) as any }));
  }
  //#endregion
  //#region toogle subtask panel for task
  toogleSubtasksAction(event: Event, task: Task, context: TasksContainer): void {
    context.toogled = task;
    setTimeout(() => {
      const toogleOpen = !task.selected;
      if (toogleOpen) {
        context.drawer?.open();
      } else {
        context.drawer?.close();
      }
      this.store.dispatch(tasksActions.TOOGLE_SUBTASKS_MENU({ task }));
      event.stopPropagation();
    });
  }
  //#endregion

  //#endregion
}
//#endregion
