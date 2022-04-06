import { NgModule } from '@angular/core';

import {
  DefaultDataServiceConfig,
  EntityDataModule,
} from '@ngrx/data';

import { entityMetadata } from './app-entity-metadata';
import { host, isE2E } from '@codete-ngrx-quick-start/shared';

const defaultDataServiceConfig: DefaultDataServiceConfig = {
  entityHttpResourceUrls: {
    Task: {
      entityResourceUrl: `${host}/tasks/model`,
      collectionResourceUrl: `${host}/tasks/model`,
    },
    SubTask: {
      entityResourceUrl: `${host}/subtasks/model`,
      collectionResourceUrl: `${host}/subtasks/model`,
    }
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
