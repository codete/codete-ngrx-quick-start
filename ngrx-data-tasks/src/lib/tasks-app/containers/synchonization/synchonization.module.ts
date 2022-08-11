//#region @browser
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SynchonizationComponent } from './synchonization.container';
import { MaterialModule } from '@codete-ngrx-quick-start/shared';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
  ],
  declarations: [SynchonizationComponent],
  exports: [SynchonizationComponent]
})
export class SynchonizationModule { }
//#endregion
