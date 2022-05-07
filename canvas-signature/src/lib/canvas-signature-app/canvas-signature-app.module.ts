import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CanvasSignatureAppComponent } from './canvas-signature-app.component';
import { Routes, RouterModule } from '@angular/router';
import { CanvasSignatureModule } from './canvas-signature/canvas-signature.module';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducer } from './canvas-signature-app.recucer';

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
    StoreModule.forRoot(reducer, {}),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({
      // maxAge: 25,
      // logOnly: environment.production
    }),
    RouterModule.forChild(routes),
  ],
  declarations: [CanvasSignatureAppComponent]
})
export class CanvasSignatureAppModule { }
