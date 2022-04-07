import { NgModule } from '@angular/core';
import { TasksComponent } from './tasks.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TasksContainerModule } from './containers/tasks-container/tasks-container.module';
import { tasksReducer } from './reducres/tasks.reducres';
import { TasksEffects } from './effects/tasks.effects';
import { tasksFeatureKey } from './tasks.constants';
import { TasksService } from './services/tasks.service';



@NgModule({
  imports: [
    TasksContainerModule,
    HttpClientModule,
    StoreModule.forFeature(tasksFeatureKey, tasksReducer),
    EffectsModule.forFeature([TasksEffects]),
  ],
  exports: [TasksComponent],
  declarations: [TasksComponent],
  providers: [
    TasksEffects,
    TasksService
  ],
})
export class TasksModule { }
