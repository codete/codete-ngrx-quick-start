import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubtasksComponent as SubtasksContainer } from './subtasks.container';
import { MaterialModule, TaskModule } from '@codete-ngrx-quick-start/shared';
import { FormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    TaskModule,
    FormsModule,
  ],
  declarations: [SubtasksContainer],
  exports: [SubtasksContainer],
})
export class SubtasksContainerModule {
}
