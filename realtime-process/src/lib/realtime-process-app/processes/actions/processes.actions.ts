import { IProcess, Process } from "@codete-ngrx-quick-start/shared";
import { Update } from "@ngrx/entity";
import { createAction, props } from "@ngrx/store";

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
  props<{ proces: Process }>()
);

export const REALTIME_CHANGES_NEW_DATA = createAction(
  '[processes] REALTIME_CHANGES_NEW_DATA',
  props<{ proces: IProcess }>()
);

export const START_PROCESS = createAction(
  '[processes] REMOVE_PROCESS',
  props<{ process: Process; }>()
);

export const START_PROCESS_SUCCESS = createAction(
  '[processes] START_PROCESS_SUCCESS'
);

export const UPDATE_PROCESS = createAction(
  '[processes] REMOVE_PROCESS',
  props<{ process: Update<IProcess>; }>()
);

// export const ADD_PROCESS = createAction(
//   '[processes] ADD_PROCESS',
//   props<{ process: IProcess; }>()
// );

// export const REMOVE_PROCESS = createAction(
//   '[processes] REMOVE_PROCESS',
//   props<{ process: IProcess; }>()
// );


// export const SYNC_PROCESSES = createAction(
//   '[processes] SYNC_PROCESSES'
// );

// export const SYNC_PROCESSES_SUCCESS = createAction(
//   '[processes] SYNC_PROCESSES_SUCCESS',
//   props<{ processes: IProcess[] }>()
// );

// export const SYNC_PROCESSES_ERRRO = createAction(
//   '[processes] SYNC_PROCESSES_ERRRO',
//   props<{ error: any; }>()
// );
