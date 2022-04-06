import { createAction } from "@ngrx/store";

export const INTI = createAction(
  '[tasks] INIT'
);


export const FETCH_TASKS = createAction(
  '[tasks] FETCH_TASKS'
);
