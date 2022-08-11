//#region @browser
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { canvasSignatureFeatureKey, CanvasSignatureInitialState } from '../canvas-signature.models';

const canvasSignatureFeatureSelector = createFeatureSelector<CanvasSignatureInitialState>(canvasSignatureFeatureKey);

export const allBatches = createSelector(canvasSignatureFeatureSelector, state => {
  return state.batches;
});

export const allowedToUndo = createSelector(canvasSignatureFeatureSelector, state => {
  return state.batches.length > 0;
});

export const allowedToRedo = createSelector(canvasSignatureFeatureSelector, state => {
  return state.stack.length > 0;
});
//#endregion
