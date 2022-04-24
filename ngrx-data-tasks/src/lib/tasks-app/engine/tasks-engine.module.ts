import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksEngineComponent } from './tasks-engine.component';
import { TasksEngineConfig, TasksEngineService } from './tasks-engine.service';
import { SubtasksService } from '../services/subtasks.service';
import { TasksService } from '../services/tasks-ngrx-data.service';
import { TasksNgrxDataContainerModule } from '../containers/tasks-ngrx-data/tasks-ngrx-data.module';

@NgModule({
  imports: [
    CommonModule,
    TasksNgrxDataContainerModule,
  ],
  declarations: [TasksEngineComponent],
  exports: [TasksEngineComponent],
  providers: [
    SubtasksService,
    TasksService,
    TasksEngineService,
  ]
})
export class TasksEngineModule {
  static forRoot(config?: TasksEngineConfig): ModuleWithProviders<TasksEngineModule> {
    return {
      ngModule: TasksEngineModule,
      providers: [
        { provide: TasksEngineService, useClass: (config && config.customEngineService) || TasksEngineService }
      ]
    };
  }

}
