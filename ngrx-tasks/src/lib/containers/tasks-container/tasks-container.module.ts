import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksContainerComponent } from './tasks-container.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [TasksContainerComponent],
  exports:  [TasksContainerComponent],
})
export class TasksContainerModule { }
