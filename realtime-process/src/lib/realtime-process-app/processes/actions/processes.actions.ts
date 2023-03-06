import { IProcess, Process } from "@codete-ngrx-quick-start/shared";
import { Update } from "@ngrx/entity";
import { createAction, props } from "@ngrx/store";
import { SerializedSubject } from "tnp-helpers";

export const INIT = createAction(
  '[processes] INIT'
);

export const FETCH_PROCESSES = createAction(
  '[processes] FETCH_PROCESSES',
);

export const FETCH_PROCESSES_SUCCESS = createAction(
  '[processes] FETCH_PROCESSES_SUCCESS',
  props<{ processes: IProcess[] }>()
);

export const FETCH_PROCESSES_ERROR = createAction(
  '[processes] FETCH_PROCESSES_ERROR',
  props<{ error: any; }>()
);

export const REALTIME_CHANGES_SUBSCRIBE = createAction(
  '[processes] REALTIME_CHANGES_SUBSCRIBE',
  props<{ process: Process, destroy$: SerializedSubject<any>; }>()
);

export const REALTIME_CHANGES_NEW_DATA = createAction(
  '[processes] REALTIME_CHANGES_NEW_DATA',
  props<{ proces: IProcess }>()
);

export const START_PROCESS = createAction(
  '[processes] START_PROCESS',
  props<{ process: Process; }>()
);

export const START_PROCESS_SUCCESS = createAction(
  '[processes] START_PROCESS_SUCCESS'
);

export const STOP_PROCESS = createAction(
  '[processes] STOP_PROCESS',
  props<{ process: Process; }>()
);

export const STOP_PROCESS_SUCCESS = createAction(
  '[processes] STOP_PROCESS_SUCCESS'
);

export const UPDATE_PROCESS = createAction(
  '[processes] UPDATE_PROCESS',
  props<{ process: Update<IProcess>; }>()
);
