import { ISubTask, ITask } from "@codete-ngrx-quick-start/shared";
import { createAction, props } from "@ngrx/store";

export const SYNC = createAction(
  '[tasks] sync'
);

export const SYNC_IDLE = createAction(
  '[tasks] sync idle'
);

export const SYNC_SUCCESS = createAction(
  '[tasks] sync success',
  props<{
    tasks: ITask[],
    subtasks: ISubTask[],
  }>()
);

export const SYNC_FAIL = createAction(
  '[tasks] sync problem'
);
