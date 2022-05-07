import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CanvasSignatureContainer } from './canvas-signature.container';
import { CanvasDrawerModule, MaterialModule } from '@codete-ngrx-quick-start/shared';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CanvasSignatureEffects } from './effects/canvas-signature.effects';
import { canvasSignatureFeatureKey } from './canvas-signature.models';
import { canvasSignatureReducer } from './reducers/canvas-signature.reducers';

@NgModule({
  imports: [
    CommonModule,
    CanvasDrawerModule,
    MaterialModule,
    StoreModule.forFeature(canvasSignatureFeatureKey, canvasSignatureReducer),
    EffectsModule.forFeature([CanvasSignatureEffects]),
  ],
  declarations: [CanvasSignatureContainer],
  exports: [CanvasSignatureContainer],
})
export class CanvasSignatureModule { }
