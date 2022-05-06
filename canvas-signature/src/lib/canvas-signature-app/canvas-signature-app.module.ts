import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CanvasSignatureAppComponent } from './canvas-signature-app.component';
import { Routes, RouterModule } from '@angular/router';
import { CanvasSignatureModule } from './containers/canvas-signature/canvas-signature.module';

const routes: Routes = [
  {
    path: '',
    component: CanvasSignatureAppComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    CanvasSignatureModule,
    RouterModule.forChild(routes),
  ],
  declarations: [CanvasSignatureAppComponent]
})
export class CanvasSignatureAppModule { }
