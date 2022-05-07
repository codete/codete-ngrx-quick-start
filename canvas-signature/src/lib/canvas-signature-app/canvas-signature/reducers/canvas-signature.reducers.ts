import { createReducer, on } from '@ngrx/store';
import * as _ from 'lodash';
import { ITask } from "@codete-ngrx-quick-start/shared";
import * as canvasSignatureActions from '../actions/canvas-signature.actions'
import { CanvasSignatureInitialState } from '../canvas-signature.models';

const initialState: CanvasSignatureInitialState = {
  batches: []
};

export const canvasSignatureReducer = createReducer(
  initialState,
  on(
    canvasSignatureActions.NEW_CANVAS_DATA_BATCH,
    (state, action) => {

      return { ...state };
    }
  ),
);
