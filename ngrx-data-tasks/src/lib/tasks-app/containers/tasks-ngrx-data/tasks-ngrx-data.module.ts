import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksContainer } from './tasks-ngrx-data.container';
import { RouterModule, Routes } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { MaterialModule } from "@codete-ngrx-quick-start/shared";
import { TaskModule } from '@codete-ngrx-quick-start/shared';
import { HttpClientModule } from '@angular/common/http';

import { SubtasksContainerModule } from '../subtasks/subtasks.module';
import { AppStoreModule } from '../../store/app-store.module';
import { SynchonizationModule } from '../synchonization/synchonization.module';
import { StaticColumnsModule } from "static-columns";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    StaticColumnsModule,
    SubtasksContainerModule,
    TaskModule,
    HttpClientModule,
    AppStoreModule,
    SynchonizationModule,
  ],
  declarations: [TasksContainer],
  exports: [TasksContainer]
})
export class TasksNgrxDataContainerModule { }
