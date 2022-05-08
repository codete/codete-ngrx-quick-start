import { PixelsBatch } from "@codete-ngrx-quick-start/shared";
import { createAction, props } from "@ngrx/store";

export const UNDO = createAction(
  '[canvas] UNDO'
);

export const REDO = createAction(
  '[canvas] REDO'
);

export const CLEAR = createAction(
  '[canvas] CLEAR'
);

export const NEW_CANVAS_DATA_BATCH = createAction(
  '[canvas] TOOGLE_SUBTASKS_MENU',
  props<{ batch: PixelsBatch; }>()
);
