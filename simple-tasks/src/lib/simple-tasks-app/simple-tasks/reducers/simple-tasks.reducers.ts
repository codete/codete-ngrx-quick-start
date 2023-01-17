import { createReducer, on } from '@ngrx/store';
import * as _ from 'lodash';
import * as simpleTasksAction from '../actions/simple-tasks.actions';
import { SimpleTasksInitialState } from '../simple-tasks.models';


const initialState: SimpleTasksInitialState = {
  simpleTasks: []
};

export const simpleTasksReducer = createReducer(
  initialState,
  on(
    simpleTasksAction.FETCH_ALL_TASKS_SUCCESS,
    (state, { simpleTasks }) => {
      return { ...state, simpleTasks: _.cloneDeep(simpleTasks) };
    }
  ),
);
