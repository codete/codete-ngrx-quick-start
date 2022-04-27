import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
  EntityOp,
  ChangeType
} from '@ngrx/data';
import { CLASS } from 'typescript-class-helpers';

import { ITask, Task } from '@codete-ngrx-quick-start/shared';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { Models } from 'ng2-rest';

@Injectable()
export class TasksService extends EntityCollectionServiceBase<Task> {

  constructor(
    serviceElementsFactory: EntityCollectionServiceElementsFactory
  ) {
    super(CLASS.getName(Task), serviceElementsFactory);
  }

}
