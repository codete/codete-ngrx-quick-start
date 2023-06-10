//#region @browser
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksAppComponent } from './tasks-app.component';
import { TasksModule } from './tasks/tasks.module';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { appFeatureKey, reducer } from './tasks-app.reducer';

const routes: Routes = [
  {
    path: '',
    component: TasksAppComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    TasksModule,
    StoreModule.forFeature(appFeatureKey, reducer),
    EffectsModule.forFeature([]),
    RouterModule.forChild(routes),
  ],
  declarations: [TasksAppComponent]
})
export class TasksAppModule2 { }
//#endregion
