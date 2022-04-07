import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksComponent } from './tasks-ngrx-data.component';
import { RouterModule, Routes } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { MaterialModule } from "@codete-ngrx-quick-start/shared";
import { TaskModule } from '@codete-ngrx-quick-start/shared';
import { TasksService } from './tasks-ngrx-data.service';
import { HttpClientModule } from '@angular/common/http';

import { SubtasksModule } from '../subtasks/subtasks.module';
import { AppStoreModule } from '../store/app-store.module';

const routes: Routes = [
  {
    path: '',
    component: TasksComponent,
  },
]


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    SubtasksModule,
    TaskModule,
    HttpClientModule,
    AppStoreModule,
    RouterModule.forChild(routes),
  ],
  declarations: [TasksComponent],
  providers: [TasksService]
})
export class TasksNgrxDataModule { }
