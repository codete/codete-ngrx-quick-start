import { ITask } from "@codete-ngrx-quick-start/shared";
import { createAction, props } from "@ngrx/store";

export const INIT = createAction(
  '[tasks] INIT'
);

export const FETCH_TASKS = createAction(
  '[tasks] FETCH_TASKS',
);

export const FETCH_TASKS_SUCCESS = createAction(
  '[tasks] FETCH_TASKS_SUCCESS',
  props<{ tasks: ITask[] }>()
);


export const FETCH_TASKS_ERROR = createAction(
  '[tasks] FETCH_TASKS_ERROR',
  props<{ error: any; }>()
);
