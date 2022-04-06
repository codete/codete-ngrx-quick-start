import { NgModule } from '@angular/core';
import { TasksComponent } from './tasks.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { TasksContainerModule } from './containers/tasks-container/tasks-container.module';

const routes: Routes = [
  {
    path: '',
    component: TasksComponent,
  },
]


@NgModule({
  imports: [
    TasksContainerModule,
    HttpClientModule,
    RouterModule.forChild(routes),
  ],
  exports: [],
  declarations: [TasksComponent],
  providers: [],
})
export class TasksModule { }
