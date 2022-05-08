import { createReducer, on } from '@ngrx/store';
import { _ } from 'tnp-core';
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

  on(
    subtasksAction.ADD_SUBTASK_SUCCESS,
    (state, { subtask }) => {
      const newState = _.cloneDeep(state)
      newState.subtasks.push(subtask);
      return { ...state, ...newState };
    }
  ),

  on(
    subtasksAction.UPDATE_SUBTASK_SUCCESS,
    (state, { subtask }) => {
      const newState = _.cloneDeep(state)
      newState.subtasks = newState.subtasks.map(t => {
        if (t.id === subtask.id) {
          return _.merge(t, subtask);
        }
        return t;
      });
      return { ...state, ...newState };
    }
  ),

  on(
    subtasksAction.DELETE_SUBTASK_SUCCESS,
    (state, { subtask }) => {
      const newState = _.cloneDeep(state)
      newState.subtasks = newState.subtasks.filter(f => f.id !== subtask.id);
      return { ...state, ...newState };
    }
  ),

);
