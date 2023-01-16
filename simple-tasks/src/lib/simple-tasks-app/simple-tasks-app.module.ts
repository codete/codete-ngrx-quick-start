import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpleTasksAppComponent } from './simple-tasks-app.component';

import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@codete-ngrx-quick-start/shared';
import { StaticColumnsModule } from "static-columns";

import { reducer } from './simple-tasks-app.reducer';

const routes: Routes = [
  {
    path: '',
    component: SimpleTasksAppComponent,
  },
];


@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    StaticColumnsModule,
    StoreModule.forRoot(reducer, {}),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({
      // maxAge: 25,
      // logOnly: environment.production
    }),
    RouterModule.forChild(routes),
  ],
  declarations: [SimpleTasksAppComponent]
})
export class SimpleTasksAppModule { }
