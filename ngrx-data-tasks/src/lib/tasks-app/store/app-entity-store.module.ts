import { NgModule } from '@angular/core';

import {
  DefaultDataServiceConfig,
  EntityDataModule,
} from '@ngrx/data';

import { entityMetadata } from './app-entity-metadata';
import { isE2E, SubTask, Task } from '@codete-ngrx-quick-start/shared';

const defaultDataServiceConfig: DefaultDataServiceConfig = {
  entityHttpResourceUrls: {
    Task: Task.URLS,
    SubTask: SubTask.URLS,
  },
  timeout: 3000, // request timeout
  getDelay: isE2E ? 0 : 500,
  saveDelay: isE2E ? 0 : 800
};

@NgModule({
  imports: [
    EntityDataModule.forRoot({
      entityMetadata: entityMetadata
    })
  ],
  providers: [
    { provide: DefaultDataServiceConfig, useValue: defaultDataServiceConfig },
  ]
})
export class AppEntityStoreModule { }
