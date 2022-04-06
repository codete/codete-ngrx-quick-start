import { createReducer, on } from '@ngrx/store';
import { ITask } from "@codete-ngrx-quick-start/shared";
import * as tasksAction from '../actions/tasks.actions';


export interface State {
  tasks: ITask[]
};

const initialState: State = {
  tasks: []
};

export const reducer = createReducer(
  initialState,
  // on(
  //   tasksAction
  //   (state) => ({ ...state }),
  // ),
);
