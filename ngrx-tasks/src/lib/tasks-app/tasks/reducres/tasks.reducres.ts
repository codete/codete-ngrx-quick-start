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

  on(
    tasksAction.TOOGLE_SUBTASKS_MENU,
    (state, { task }) => {
      const newState = _.cloneDeep(state)
      newState.tasks = newState.tasks.map(t => {
        if (t.id === task.id) {
          t.selected = !task.selected;
        } else {
          t.selected = false
        }
        return t;
      });
      return { ...state, ...newState };
    }
  ),

  on(
    tasksAction.ADD_TASK_SUCCESS,
    (state, { task }) => {
      const newState = _.cloneDeep(state)
      newState.tasks.push(task);
      return { ...state, ...newState };
    }
  ),

  on(
    tasksAction.UPDATE_TASK_SUCCESS,
    (state, { task }) => {
      const newState = _.cloneDeep(state)
      newState.tasks = newState.tasks.map(t => {
        if (t.id === task.id) {
          return _.merge(t, task);
        }
        return t;
      });
      return { ...state, ...newState };
    }
  ),

  on(
    tasksAction.DELETE_TASK_SUCCESS,
    (state, { task }) => {
      const newState = _.cloneDeep(state)
      newState.tasks = newState.tasks.filter(f => f.id !== task.id);
      return { ...state, ...newState };
    }
  ),

);
