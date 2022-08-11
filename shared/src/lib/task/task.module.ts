//#region @browser
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskComponent } from './task.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { StaticColumnsModule } from "static-columns";

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    StaticColumnsModule,
  ],
  declarations: [TaskComponent],
  exports: [TaskComponent],
})
export class TaskModule { }
//#endregion
