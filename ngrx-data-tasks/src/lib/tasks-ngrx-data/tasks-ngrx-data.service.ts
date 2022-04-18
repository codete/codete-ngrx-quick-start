import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory
} from '@ngrx/data';
import { CLASS } from 'typescript-class-helpers';

import { Task } from '@codete-ngrx-quick-start/shared';

@Injectable({ providedIn: 'root' })
export class TasksService extends EntityCollectionServiceBase<Task> {

  constructor(
    serviceElementsFactory: EntityCollectionServiceElementsFactory
  ) {
    super(CLASS.getName(Task), serviceElementsFactory);
  }

}
