//#region @browser
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpleTasksComponent } from './simple-tasks.component';
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
  declarations: [SimpleTasksComponent],
  exports: [SimpleTasksComponent],
  providers: [
    SimpleTasksService,
  ]
})
export class SimpleTasksModule { }
//#endregion
