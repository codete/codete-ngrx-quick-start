import { Injectable } from '@angular/core';
import { ISubTask, SubTask } from '@codete-ngrx-quick-start/shared';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { CLASS } from 'typescript-class-helpers';

@Injectable()
export class SubtasksService extends EntityCollectionServiceBase<ISubTask>{
  constructor(
    serviceElementsFactory: EntityCollectionServiceElementsFactory
  ) {
    super(CLASS.getName(SubTask), serviceElementsFactory);
  }

}
