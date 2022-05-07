import { createFeatureSelector, createSelector } from '@ngrx/store';
import { canvasSignatureFeatureKey, CanvasSignatureInitialState } from '../canvas-signature.models';

const canvasSignatureFeatureSelector = createFeatureSelector<CanvasSignatureInitialState>(canvasSignatureFeatureKey);

export const allBatches = createSelector(canvasSignatureFeatureSelector, state => {
  return state.batches;
});
