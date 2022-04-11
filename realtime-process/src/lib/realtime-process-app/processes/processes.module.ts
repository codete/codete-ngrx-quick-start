import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcessesComponent } from './processes.component';
import { ProcessesService } from './services/processes.service';
import { ProcessController } from '@codete-ngrx-quick-start/shared';
import { StoreModule } from '@ngrx/store';
import { reducer } from '../realtime-process-app.reducer';
import { processesFeatureKey } from './processes.constants';
import { EffectsModule } from '@ngrx/effects';
import { ProcessEffects } from './effects/processes.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(processesFeatureKey, reducer),
    EffectsModule.forFeature([ProcessEffects]),
  ],
  declarations: [ProcessesComponent],
  exports: [ProcessesComponent],
  providers: [ProcessesService, ProcessController]
})
export class ProcessesModule { }
