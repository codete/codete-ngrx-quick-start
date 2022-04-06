import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksComponent } from './tasks-ngrx-data.component';
import {  MaterialModule } from "@codete-ngrx-quick-start/shared";
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TaskModule } from '@codete-ngrx-quick-start/shared';
import { SubtasksModule } from '../subtasks/subtasks.module';
import { TasksService } from './tasks-ngrx-data.service';
import { AppStoreModule } from '../store/app-store.module';
import { HttpClientModule } from '@angular/common/http';

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
    AppStoreModule,
    TaskModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forChild(routes),
  ],
  declarations: [TasksComponent],
  providers: [TasksService]
})
export class TasksNgrxDataModule { }
