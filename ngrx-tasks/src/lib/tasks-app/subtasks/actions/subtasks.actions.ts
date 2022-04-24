import { ISubTask, ITask } from "@codete-ngrx-quick-start/shared";
import { createAction, props } from "@ngrx/store";


export const FETCH_SUBTASKS = createAction(
  '[tasks] FETCH_SUBTASKS',
);

export const FETCH_SUBTASKS_SUCCESS = createAction(
  '[tasks] FETCH_SUBTASKS_SUCCESS',
  props<{ subtasks: ISubTask[] }>()
);

export const FETCH_SUBTASKS_ERROR = createAction(
  '[tasks] FETCH_SUBTASKS_ERROR',
  props<{ error: any; }>()
);


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
