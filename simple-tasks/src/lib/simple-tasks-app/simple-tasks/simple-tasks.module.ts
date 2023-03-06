//#region @browser
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpleTasksContainer } from './simple-tasks.container';
import { MaterialModule } from '@codete-ngrx-quick-start/shared';
import { FormsModule } from '@angular/forms';
import { StaticColumnsModule } from 'static-columns';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { simpleTasksFeatureKey } from './simple-tasks.constants';
import { simpleTasksReducer } from './reducers/simple-tasks.reducers';
import { SimpleTasksEffects } from './effects/simple-tasks.effects';
import { SimpleTasksService } from './services/simple-tasks.service';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    StaticColumnsModule,
    StoreModule.forFeature(simpleTasksFeatureKey, simpleTasksReducer),
    EffectsModule.forFeature([SimpleTasksEffects]),
  ],
  declarations: [SimpleTasksContainer],
  exports: [SimpleTasksContainer],
  providers: [
    SimpleTasksService,
  ]
})
export class SimpleTasksModule { }
//#endregion
