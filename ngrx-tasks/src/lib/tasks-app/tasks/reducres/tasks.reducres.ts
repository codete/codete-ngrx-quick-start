import { createReducer, on } from '@ngrx/store';
import * as _ from 'lodash';
import { ITask } from "@codete-ngrx-quick-start/shared";
import * as tasksAction from '../actions/tasks.actions';
import { TasksInitialState } from '../tasks.models';


const initialState: TasksInitialState = {
  tasks: []
};

export const tasksReducer = createReducer(
  initialState,
  on(
    tasksAction.FETCH_TASKS_SUCCESS,
    (state, { tasks }) => {
      return { ...state, tasks: _.cloneDeep(tasks) };
    }
  ),
);
