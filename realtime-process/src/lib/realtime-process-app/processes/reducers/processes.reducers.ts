import { _ } from 'tnp-core';
import { IProcess } from "@codete-ngrx-quick-start/shared";
import { createEntityAdapter, EntityAdapter } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { ProcessesInitialState, ProcessesState } from "../processes.models";
import * as processesActions from '../actions/processes.actions';


export const adapter: EntityAdapter<IProcess> = createEntityAdapter<IProcess>();

const initialState: ProcessesInitialState = adapter.getInitialState({
  backgroundOperation: 'nothing',
});


export const reducer = createReducer(
  initialState,
  on(processesActions.INIT,
    (state, action) => adapter.setAll([], {
      ...state,
      isLoadingProcesses: false
    })
  ),
  on(processesActions.FETCH_PROCESSES,
    (state, action) => adapter.setAll([], {
      ...state,
      isLoadingProcesses: true
    })
  ),
  on(processesActions.FETCH_PROCESSES_SUCCESS,
    (state, { processes }) => {
      return adapter.setAll(processes, {
        ...state,
        isLoadingProcesses: false
      })
    }
  ),
  on(processesActions.UPDATE_PROCESS,
    (state, action) => {
      const actionProcess = _.cloneDeep(action.process);

      let onlyAllowedNext = [];
      const existed = state.entities[action.process.id]
      if (existed.state === 'killing') {
        onlyAllowedNext = ['killed', 'ended-with-error', 'ended-ok']
      }

      if (existed.state === 'starting') {
        onlyAllowedNext = ['active']
      }
      if (onlyAllowedNext.length > 0) {
        if (actionProcess.changes.state && !onlyAllowedNext.includes(actionProcess.changes.state)) {
          console.warn(`Changing state to ${existed.state}... `);
          actionProcess.changes.state = existed.state;
        }
      }

      return adapter.updateOne(actionProcess, {
        ...state,
      })
    }
  ),

  // on(processesActions.ADD_PROCESS,
  //   (state, action) => adapter.addOne(action.process, {
  //     ...state,
  //   })
  // ),

  // on(processesActions.REMOVE_PROCESS,
  //   (state, action) => adapter.removeOne(action.process.id, {
  //     ...state,
  //   })
  // ),
  // on(processesActions.SYNC_PROCESSES,
  //   (state, action) => {
  //     return {
  //       ...state,
  //       isSyncingProcesses: true
  //     }
  //   }
  // ),
  // on(processesActions.SYNC_PROCESSES_SUCCESS,
  //   (state, { processes }) => adapter.setAll(processes, {
  //     ...state,
  //     isSyncingProcesses: true,
  //   })
  // ),
);


/**
 * DO NOT PUT THIS INSIDE SELECTORS - ERROR
 */
export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = adapter.getSelectors();
