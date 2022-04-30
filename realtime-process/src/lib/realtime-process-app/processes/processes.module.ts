import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcessesComponent } from './processes.component';
import { ProcessesService } from './services/processes.service';
import { MaterialModule, ProcessController, ProcessModule } from '@codete-ngrx-quick-start/shared';
import { StoreModule } from '@ngrx/store';
import { processesFeatureKey } from './processes.constants';
import { EffectsModule } from '@ngrx/effects';
import { ProcessEffects } from './effects/processes.effects';
import { reducer } from './reducers/processes.reducers';

@NgModule({
  imports: [
    CommonModule,
    ProcessModule,
    MaterialModule,
    StoreModule.forFeature(processesFeatureKey, reducer),
    EffectsModule.forFeature([ProcessEffects]),
  ],
  declarations: [ProcessesComponent],
  exports: [ProcessesComponent],
  providers: [ProcessesService, ProcessController]
})
export class ProcessesModule { }
