import { _ } from 'tnp-core';
import { Injectable } from '@angular/core';
import { TasksEngineService as BaseTasksEngineService } from '@codete-ngrx-quick-start/ngrx-data-tasks';
import { SubtasksComponent } from '@codete-ngrx-quick-start/ngrx-data-tasks/tasks-app/containers/subtasks/subtasks.container';
import { TasksContainer } from '@codete-ngrx-quick-start/ngrx-data-tasks/tasks-app/containers/tasks-ngrx-data/tasks-ngrx-data.container';
import { Task, ISubTask, SubTask, ITask } from '@codete-ngrx-quick-start/shared';
import { Store } from '@ngrx/store';
import { firstValueFrom, Observable, of } from 'rxjs';
import { TasksInitialState } from './tasks.models';
import * as tasksSelectors from './selectors/tasks.selectors';
import * as tasksActions from './actions/tasks.actions';
import * as subtasksSelectors from '../subtasks/selectors/subtasks.selectors';
import * as subtasksActions from '../subtasks/actions/subtasks.actions';
import { Models } from 'ng2-rest';

type UnwanterServices = 'subtasksService' | 'tasksService';

@Injectable()
export class TasksEngineService implements Omit<BaseTasksEngineService, UnwanterServices> {

  constructor(private store: Store<TasksInitialState>) { }

  helloWorld() {
    return 'Hello from standard ngrx application'
  }

  title() {
    return of('HAMSTERS TASKS (standard ngrx application)')
  }

  allTasksSelector(context: TasksContainer): Observable<Task[]> | Store<Task[]> {
    return this.store.select(tasksSelectors.allTasks) as any;
  }
  allSubtasks(context: SubtasksComponent): Observable<ISubTask[]> | Store<ISubTask[]> {
    return this.store.select(subtasksSelectors.allSubTasks) as any;
  }
  initAction(context: TasksContainer): void {
    this.store.dispatch(tasksActions.INIT());
  }
  fetchSubtaskAction(): void {
    this.store.dispatch(subtasksActions.FETCH_SUBTASKS());
  }

  async addTaskAction(event: KeyboardEvent, context: TasksContainer): Promise<void> {
    if (event.code === 'Enter') {
      this.store.dispatch(tasksActions.ADD_TASK({
        task: {
          name: context.newTaskModel
        }
      }));
      context.newTaskModel = '';
    }
  }

  onSaveTaskAction(updatedProps: Partial<ITask>, task: Task) {
    task = _.cloneDeep(task) as Task;
    _.merge(task, updatedProps);
    this.store.dispatch(tasksActions.UPDATE_TASK_SUCCESS({ task }));
  }

  toogleSubtasksAction(event: Event, task: Task, context: TasksContainer): void {
    context.toogled = task;
    setTimeout(async () => {
      task = _.cloneDeep(task) as Task;
      task.selected = !task.selected;
      // this.tasksService.updateManyInCache(
      //   (await firstValueFrom(this.tasksService.entities$)).map(t => {
      //     t = _.cloneDeep(t) as Task;
      //     t.selected = false;
      //     return t;
      //   })
      // );
      // if (task.selected) {
      //   this.tasksService.updateOneInCache(task);
      //   context.drawer?.open();
      // } else {
      //   context.drawer?.close();
      // }
      event.stopPropagation();
    });
  }

  // @ts-ignore
  saveAll(): Observable<[Observable<Models.HttpResponse<Task[]>>, Observable<Models.HttpResponse<Task[]>>]> {
    throw 'not implemented'
  }



}
