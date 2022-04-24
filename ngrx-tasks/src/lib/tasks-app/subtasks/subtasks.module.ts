import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { subtasksFeatureKey } from './subtasks.constants';
import { subtasksReducer } from './reducers/subtasks.reducers';
import { SubTasksEffects } from './effects/subtasks.effects';
import { SubTasksService } from './services/subtasks.service';


@NgModule({
  imports: [
    HttpClientModule,
    StoreModule.forFeature(subtasksFeatureKey, subtasksReducer),
    EffectsModule.forFeature([SubTasksEffects]),
  ],
  providers: [
    SubTasksService,
  ],
})
export class SubTasksModule { }
