import { ISimpleTask } from '@codete-ngrx-quick-start/shared';
import { createReducer, on } from '@ngrx/store';
import * as _ from 'lodash';
import * as simpleTasksAction from '../actions/simple-tasks.actions';
import { SimpleTasksInitialState } from '../simple-tasks.models';


const initialState: SimpleTasksInitialState = {
  simpleTasks: [],
  loveFirst: false,
};

export const simpleTasksReducer = createReducer(
  initialState,
  on(
    simpleTasksAction.FETCH_ALL_TASKS_SUCCESS,
    (state, { simpleTasks }) => {
      return { ...state, simpleTasks: _.cloneDeep(simpleTasks) };
    }
  ),
  on(
    simpleTasksAction.ADD_TASK_SUCCESS,
    (state, { task }) => {
      return {
        ...state, simpleTasks: [
          ...state.simpleTasks,
          task,
        ]
      };
    }
  ),
  on(
    simpleTasksAction.DELETE_TASK_SUCCESS,
    (state, { task }) => {
      return {
        ...state, simpleTasks: [
          ...state.simpleTasks.filter(t => t.id !== task.id)
        ],
      };
    }
  ),

  on(
    simpleTasksAction.ORDER_LOVE_FIRST,
    (state, { loveFirst }) => {
      return {
        ...state,
        simpleTasks: [
          ...state.simpleTasks,
        ],
        loveFirst
      };
    }
  ),

  on(
    simpleTasksAction.LOVE_TASK,
    (state, { task }) => {
      const simpleTasks = _.cloneDeep(state.simpleTasks) as ISimpleTask[];
      const taskToLove = simpleTasks.find(({ id }) => task.id === id);
      taskToLove.love = true;
      return {
        ...state,
        simpleTasks
      };
    }
  ),

  on(
    simpleTasksAction.UNLOVE_TASK,
    (state, { task }) => {
      const simpleTasks = _.cloneDeep(state.simpleTasks) as ISimpleTask[];
      const taskToLove = simpleTasks.find(({ id }) => task.id === id);
      taskToLove.love = false;
      return {
        ...state,
        simpleTasks
      };
    }
  ),

);
