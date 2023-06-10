//#region @browser
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { appFeatureKey, reducer } from './realtime-process-app.reducer';
import { RealtimeProcessAppComponent } from './realtime-process-app.component';
import { ProcessesModule } from './processes/processes.module';

const routes: Routes = [
  {
    path: '',
    component: RealtimeProcessAppComponent,
  },
];


@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(appFeatureKey, reducer),
    EffectsModule.forFeature([]),
    RouterModule.forChild(routes),
    ProcessesModule,
  ],
  declarations: [RealtimeProcessAppComponent]
})
export class RealtimeProcessAppModule { }
//#endregion
