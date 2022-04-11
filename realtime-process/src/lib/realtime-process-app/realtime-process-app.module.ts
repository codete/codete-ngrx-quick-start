import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducer } from './realtime-process-app.reducer';
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
    StoreModule.forRoot(reducer, {}),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({
      // maxAge: 25,
      // logOnly: environment.production
    }),
    RouterModule.forChild(routes),
    ProcessesModule,
  ],
  declarations: [RealtimeProcessAppComponent]
})
export class RealtimeProcessAppModule { }

