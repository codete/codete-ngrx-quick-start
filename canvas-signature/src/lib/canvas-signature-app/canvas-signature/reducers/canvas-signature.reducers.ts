import { createReducer, on } from '@ngrx/store';
import * as _ from 'lodash';
import * as canvasSignatureActions from '../actions/canvas-signature.actions'
import { CanvasSignatureInitialState } from '../canvas-signature.models';

const initialState: CanvasSignatureInitialState = {
  batches: [],
  stack: [],
};

export const canvasSignatureReducer = createReducer(
  initialState,
  on(
    canvasSignatureActions.NEW_CANVAS_DATA_BATCH,
    (state, action) => {
      const newState = _.cloneDeep(state);
      newState.batches.push(_.cloneDeep(action.batch));
      return { ...state, ...newState };
    }
  ),
  on(
    canvasSignatureActions.UNDO,
    (state) => {
      const newState = _.cloneDeep(state);
      newState.stack.push(newState.batches.pop());
      return { ...state, ...newState };
    }
  ),
  on(
    canvasSignatureActions.REDO,
    (state) => {
      const newState = _.cloneDeep(state);
      newState.batches.push(newState.stack.pop());
      return { ...state, ...newState };
    }
  ),
  on(
    canvasSignatureActions.CLEAR,
    (state) => {
      return {
        batches: [],
        stack: []
      };
    }
  ),

);
