import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CanvasDrawerComponent } from './canvas-drawer.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CanvasDrawerComponent],
  exports: [CanvasDrawerComponent],
})
export class CanvasDrawerModule { }
