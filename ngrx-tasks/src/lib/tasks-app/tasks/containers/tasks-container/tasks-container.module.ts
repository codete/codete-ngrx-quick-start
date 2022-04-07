import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksContainerComponent } from './tasks-container.component';

import { FormsModule } from '@angular/forms';
import { MaterialModule } from "@codete-ngrx-quick-start/shared";
import { TaskModule } from '@codete-ngrx-quick-start/shared';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    TaskModule,
    HttpClientModule,
  ],
  declarations: [TasksContainerComponent],
  exports: [TasksContainerComponent],
})
export class TasksContainerModule { }
