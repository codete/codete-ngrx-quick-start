import { MatDrawer } from "@angular/material/sidenav/drawer";
import { ITask } from "@codete-ngrx-quick-start/shared";
import { createAction, props } from "@ngrx/store";

export const INIT = createAction(
  '[tasks] INIT'
);

export const TOOGLE_SUBTASKS_MENU = createAction(
  '[tasks] TOOGLE_SUBTASKS_MENU',
  props<{ task: ITask; }>()
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
export const UPDATE_TASK = createAction(
  '[tasks] UPDATE_TASK',
  props<{ task: ITask }>()
);

export const UPDATE_TASK_SUCCESS = createAction(
  '[tasks] UPDATE_TASK_SUCCESS',
  props<{ task: ITask; }>()
);

export const UPDATE_TASK_ERROR = createAction(
  '[tasks] UPDATE_TASK_ERROR',
  props<{ error?: any; }>()
);
//#endregion

//#region delete task
export const DELETE_TASK = createAction(
  '[tasks] DELETE_TASK',
  props<{ task: ITask }>()
);

export const DELETE_TASK_SUCCESS = createAction(
  '[tasks] DELETE_TASK_SUCCESS',
  props<{ task: ITask; }>()
);

export const DELETE_TASK_ERROR = createAction(
  '[tasks] DELETE_TASK_ERROR',
  props<{ error?: any; }>()
);
//#endregion

