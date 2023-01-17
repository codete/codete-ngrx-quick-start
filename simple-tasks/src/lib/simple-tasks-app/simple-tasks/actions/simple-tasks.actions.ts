import { ISimpleTask } from "@codete-ngrx-quick-start/shared";
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
  props<{ task: ISimpleTask; }>()
);

export const DELETE_TASK = createAction(
  '[simple-tasks] DELETE_TASK',
  props<{ task: ISimpleTask; }>()
);
