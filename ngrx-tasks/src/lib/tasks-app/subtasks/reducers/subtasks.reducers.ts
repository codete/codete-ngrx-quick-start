import { createReducer, on } from '@ngrx/store';
import { _ } from 'tnp-core';
import { ITask } from "@codete-ngrx-quick-start/shared";
import * as subtasksAction from '../actions/subtasks.actions';
import { SubTasksInitialState } from '../subtasks.models';


const initialState: SubTasksInitialState = {
  subtasks: []
};

export const subtasksReducer = createReducer(
  initialState,
  on(
    subtasksAction.FETCH_SUBTASKS_SUCCESS,
    (state, { subtasks }) => {
      return { ...state, subtasks: _.cloneDeep(subtasks) };
    }
  ),
);
