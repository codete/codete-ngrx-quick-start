import { ISimpleTask, SimpleTask } from "@codete-ngrx-quick-start/shared";
import { createAction, props } from "@ngrx/store";

export const INIT = createAction(
  '[simple-tasks] INIT'
);

export const FETCH_ALL_TASKS = createAction(
  '[simple-tasks] FETCH_ALL_TASKS',
);

export const FETCH_ALL_TASKS_SUCCESS = createAction(
  '[simple-tasks] FETCH_ALL_TASKS_SUCCESS',
  props<{ simpleTasks: ISimpleTask[]; }>()
);

export const FETCH_ALL_TASKS_ERROR = createAction(
  '[simple-tasks] FETCH_ALL_TASKS_ERROR',
  props<{ error: any; }>()
);

export const ADD_TASK = createAction(
  '[simple-tasks] ADD_TASK',
  props<{ task: SimpleTask; }>()
);

export const ADD_TASK_SUCCESS = createAction(
  '[simple-tasks] ADD_TASK_SUCCESS',
  props<{ task: ISimpleTask; }>()
);

export const ADD_TASK_ERROR = createAction(
  '[simple-tasks] ADD_TASK_ERROR',
  props<{ error: any; }>()
);

export const DELETE_TASK = createAction(
  '[simple-tasks] DELETE_TASK',
  props<{ task: ISimpleTask; }>()
);

export const DELETE_TASK_SUCCESS = createAction(
  '[simple-tasks] DELETE_TASK_SUCCESS',
  props<{ task: ISimpleTask; }>()
);

export const DELETE_TASK_ERROR = createAction(
  '[simple-tasks] DELETE_TASK_ERROR',
  props<{ error: any; }>()
);

export const REALTIME_CHANGES_SUBSCRIBE = createAction(
  '[simple-tasks] REALTIME_CHANGES_SUBSCRIBE'
);

export const REALTIME_CHANGES_NEW_DATA = createAction(
  '[simple-tasks] REALTIME_CHANGES_NEW_DATA',
  props<{ simpleTasks: ISimpleTask[]; }>()
);
