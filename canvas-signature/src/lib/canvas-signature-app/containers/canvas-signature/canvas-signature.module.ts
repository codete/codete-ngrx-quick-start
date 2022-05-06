import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CanvasSignatureContainer } from './canvas-signature.container';
import { CanvasDrawerModule, MaterialModule } from '@codete-ngrx-quick-start/shared';


@NgModule({
  imports: [
    CommonModule,
    CanvasDrawerModule,
    MaterialModule,
  ],
  declarations: [CanvasSignatureContainer],
  exports: [CanvasSignatureContainer],
})
export class CanvasSignatureModule { }
