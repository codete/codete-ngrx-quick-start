import { ITask } from "@codete-ngrx-quick-start/shared";
import { createAction, props } from "@ngrx/store";

export const INIT = createAction(
  '[tasks] INIT'
);

export const TOOGLE_SUBTASKS_MENU = createAction(
  '[tasks] TOOGLE_SUBTASKS_MENU',
  props<{ open: boolean; }>()
);

//#region fetch tasks
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

//#endregion

//#region add task
export const ADD_TASK = createAction(
  '[tasks] ADD_TASK',
  props<{ task: ITask }>()
);

export const ADD_TASK_SUCCESS = createAction(
  '[tasks] ADD_TASK_SUCCESS',
  props<{ task: ITask }>()
);

export const ADD_TASK_ERROR = createAction(
  '[tasks] ADD_TASK_ERROR',
  props<{ error: any; }>()
);
//#endregion

//#region update task
export const UPDATE_TASK_SUCCESS = createAction(
  '[tasks] UPDATE_TASK_SUCCESS',
  props<{ task: ITask }>()
);

export const UPDATE_TASK_SUCCESS_SUCCESS = createAction(
  '[tasks] UPDATE_TASK_SUCCESS_SUCCESS',
  props<{ task: ITask; }>()
);

export const UPDATE_TASK_SUCCESS_ERROR = createAction(
  '[tasks] UPDATE_TASK_SUCCESS_ERROR',
  props<{ error?: any; }>()
);
//#endregion
