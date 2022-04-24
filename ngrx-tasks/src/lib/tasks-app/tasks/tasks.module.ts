import { NgModule } from '@angular/core';
import { TasksComponent } from './tasks.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { tasksReducer } from './reducres/tasks.reducres';
import { TasksEffects } from './effects/tasks.effects';
import { tasksFeatureKey } from './tasks.constants';
import { TasksService } from './services/tasks.service';
import { TasksEngineModule } from '@codete-ngrx-quick-start/ngrx-data-tasks';
import { TasksEngineService } from './tasks.service';

@NgModule({
  imports: [
    TasksEngineModule.forRoot({
      customEngineService: TasksEngineService
    }),
    HttpClientModule,
    StoreModule.forFeature(tasksFeatureKey, tasksReducer),
    EffectsModule.forFeature([TasksEffects]),
  ],
  exports: [TasksComponent],
  declarations: [TasksComponent],
  providers: [
    TasksEffects,
    TasksService,
    TasksEngineService,
  ],
})
export class TasksModule { }
