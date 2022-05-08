import { _ } from 'tnp-core';
import { Injectable } from '@angular/core';
import { TasksEngineService as BaseTasksEngineService } from '@codete-ngrx-quick-start/ngrx-data-tasks';
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
import { SyncState } from '@codete-ngrx-quick-start/ngrx-data-tasks/tasks-app/containers/synchonization/synchonization.models';

type UnwanterServices = 'subtasksService' | 'tasksService';

@Injectable()
export class NormalNgrxEngineService implements Omit<BaseTasksEngineService, UnwanterServices> {
  //#region constructor
  constructor(private store: Store<TasksInitialState>) { }
  //#endregion

  //#region helpers
  helloWorld() {
    return 'Hello from standard ngrx application'
  }

  title() {
    return of('HAMSTERS TASKS (standard ngrx application)')
  }
  //#endregion

  //#region synchonization
  get isProcessingSubtaskRequestSelector(): Observable<boolean> | Store<boolean> {
    return of(false); // TODO
  }
  get isProcessingTaskRequestSelector(): Observable<boolean> | Store<boolean> {
    return of(false); // TODO
  }
  synchonizationSateSelector(): Observable<SyncState> {
    return of('idle'); // TODO
  }
  //#endregion

  //#region subtasks

  //#region subtasks / actions
  fetchSubtaskAction(taskId: number): void {
    this.store.dispatch(subtasksActions.FETCH_SUBTASKS({ taskId }));
  }
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
  removeSubTaskAction(subtask: SubTask) {
    this.store.dispatch(subtasksActions.DELETE_SUBTASK({ subtask: subtask as any }));
  }
  onSaveSubTaskAction(updatedProps: Partial<ISubTask>, subtask: SubTask): void {
    this.store.dispatch(subtasksActions.UPDATE_SUBTASK({ subtask: _.merge(_.clone(subtask), updatedProps) as any }));
  }
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

  //#region subtasks / selectors
  allSubtasks(context: SubtasksComponent): Observable<ISubTask[]> | Store<ISubTask[]> {
    return this.store.select(subtasksSelectors.allSubTasks) as any;
  }
  //#endregion

  //#endregion

  //#region tasks

  //#region tasks / actions
  initAction() {
    this.store.dispatch(tasksActions.INIT());
  }

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

  removeTaskAction(taskId: number) {
    this.store.dispatch(tasksActions.DELETE_TASK({ task: { id: taskId } as any }));
  }

  onSaveTaskAction(updatedProps: Partial<ITask>, task: Task) {
    task = _.cloneDeep(task) as Task;
    _.merge(task, updatedProps);
    this.store.dispatch(tasksActions.UPDATE_TASK_SUCCESS({ task }));
  }

  //#endregion

  //#region tasks / selectors
  allTasksSelector(context: TasksContainer): Observable<Task[]> | Store<Task[]> {
    return this.store.select(tasksSelectors.allTasks) as any;
  }
  //#endregion

  //#endregion
}
