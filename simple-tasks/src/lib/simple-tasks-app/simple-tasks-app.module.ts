//#region @browser
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

import { appFeatureKey, reducer } from './simple-tasks-app.reducer';
import { SimpleTasksModule } from './simple-tasks/simple-tasks.module';

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
    StoreModule.forFeature(appFeatureKey, reducer),
    EffectsModule.forFeature([]),
    RouterModule.forChild(routes),
    SimpleTasksModule,
  ],
  declarations: [SimpleTasksAppComponent],
  providers: []
})
export class SimpleTasksAppModule { }
//#endregion
