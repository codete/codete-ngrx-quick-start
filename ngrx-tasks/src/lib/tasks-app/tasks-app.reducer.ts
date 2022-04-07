import { Action, createReducer, on } from '@ngrx/store';

export const appFeatureKey = 'tasks-app';

export interface AppState {
  loggedUser: string;
}

export const initialState: AppState = {
  loggedUser: ''
};

export const reducer = createReducer(
  initialState,
);

