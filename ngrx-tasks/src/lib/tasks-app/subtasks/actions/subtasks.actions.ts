import { ISubTask, ITask } from "@codete-ngrx-quick-start/shared";
import { createAction, props } from "@ngrx/store";

//#region fetch subtasks

export const FETCH_SUBTASKS = createAction(
  '[tasks] FETCH_SUBTASKS',
  props<{ taskId: number; }>()
);

export const FETCH_SUBTASKS_SUCCESS = createAction(
  '[tasks] FETCH_SUBTASKS_SUCCESS',
  props<{ subtasks: ISubTask[] }>()
);

export const FETCH_SUBTASKS_ERROR = createAction(
  '[tasks] FETCH_SUBTASKS_ERROR',
  props<{ error: any; }>()
);

//#endregion

//#region add subtasks
export const ADD_SUBTASK = createAction(
  '[tasks] ADD_SUBTASK',
  props<{ subtask: ISubTask }>()
);


export const ADD_SUBTASK_SUCCESS = createAction(
  '[tasks] ADD_SUBTASK_SUCCESS',
  props<{ subtask: ISubTask }>()
);


export const ADD_SUBTASK_ERROR = createAction(
  '[tasks] ADD_SUBTASK_ERROR',
  props<{ error: any; }>()
);
//#endregion

//#region update subtasks
export const UPDATE_SUBTASK = createAction(
  '[tasks] UPDATE_SUBTASK',
  props<{ subtask: ISubTask }>()
);


export const UPDATE_SUBTASK_SUCCESS = createAction(
  '[tasks] UPDATE_SUBTASK_SUCCESS',
  props<{ subtask: ISubTask }>()
);


export const UPDATE_SUBTASK_ERROR = createAction(
  '[tasks] UPDATE_SUBTASK_ERROR',
  props<{ error: any; }>()
);
//#endregion

//#region update subtasks
export const DELETE_SUBTASK = createAction(
  '[tasks] DELETE_SUBTASK',
  props<{ subtask: ISubTask }>()
);


export const DELETE_SUBTASK_SUCCESS = createAction(
  '[tasks] DELETE_SUBTASK_SUCCESS',
  props<{ subtask: ISubTask }>()
);


export const DELETE_SUBTASK_ERROR = createAction(
  '[tasks] DELETE_SUBTASK_ERROR',
  props<{ error: any; }>()
);
//#endregion


