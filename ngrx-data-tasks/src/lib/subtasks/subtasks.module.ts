import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubtasksComponent } from './subtasks.component';
import { MaterialModule, TaskModule } from '@codete-ngrx-quick-start/shared';
import { FormsModule } from '@angular/forms';
import { SubtasksService } from './subtasks.service';


@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    TaskModule,
    FormsModule,
  ],
  declarations: [SubtasksComponent],
  exports: [SubtasksComponent],
  providers: [SubtasksService],
})
export class SubtasksModule { }
