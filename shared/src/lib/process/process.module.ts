import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcessComponent } from './process.component';
import { MaterialModule } from '../material.module';
import { ProcessSyncComponent } from './process-sync/process-sync.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  declarations: [
    ProcessComponent,
    ProcessSyncComponent,
  ],
  exports: [ProcessComponent],
})
export class ProcessModule { }
