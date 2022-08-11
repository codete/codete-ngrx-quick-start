//#region @browser
import { PixelsBatch } from "@codete-ngrx-quick-start/shared";

export const canvasSignatureFeatureKey = 'canvas';

export interface CanvasSignatureInitialState {
  batches: PixelsBatch[];
  stack: PixelsBatch[];
};
//#endregion
