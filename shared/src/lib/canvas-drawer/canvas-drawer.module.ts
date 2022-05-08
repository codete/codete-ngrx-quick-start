import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CanvasDrawerComponent } from './canvas-drawer.component';
import { SignHerePlaceholderModule } from './sign-here-placeholder/sign-here-placeholder.module';

@NgModule({
  imports: [
    CommonModule,
    SignHerePlaceholderModule,
  ],
  declarations: [CanvasDrawerComponent],
  exports: [CanvasDrawerComponent],
})
export class CanvasDrawerModule { }
