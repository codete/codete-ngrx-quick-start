import { _ } from 'tnp-core';
import { EntityOp } from "@ngrx/data";
import { ActionReducer, createReducer, on } from "@ngrx/store";
import { InitalAppState } from "./app.models";
import * as appConfigActions from '../store/app.actions';

export const appConfigStoreKey = 'appConfig';

export const appInitialState: InitalAppState = {
  syncState: 'idle'
};

export const appReducer = createReducer(
  appInitialState,
  on(
    appConfigActions.SYNC,
    (state) => {
      return { ...state, syncState: 'syncing' };
    }
  ),
  on(
    appConfigActions.SYNC_IDLE,
    (state) => {
      return { ...state, syncState: 'idle' };
    }
  ),
  on(
    appConfigActions.SYNC_SUCCESS,
    (state) => {
      return { ...state, syncState: 'syncing-done' };
    }
  ),
  on(
    appConfigActions.SYNC_FAIL,
    (state) => {
      return { ...state, syncState: 'sync-problem' };
    }
  ),
);

export function appMetaReducer(reducer: ActionReducer<any>) {
  return function (state, action) {
    // console.log(state);
    // console.log(action)
    return reducer(state, action);
  }
}
