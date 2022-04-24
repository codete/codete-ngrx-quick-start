import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksAppComponent } from './tasks-app.component';
import { RouterModule, Routes } from '@angular/router';
import { TasksEngineModule } from './engine/tasks-engine.module';


const routes: Routes = [
  {
    path: '',
    component: TasksAppComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TasksEngineModule.forRoot(),
  ],
  declarations: [TasksAppComponent]
})
export class TasksAppModule1 { }
