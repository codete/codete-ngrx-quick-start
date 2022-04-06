import { Injectable } from '@angular/core';
import { ISubTask } from '@codete-ngrx-quick-start/shared';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';

@Injectable({ providedIn: 'root' })
export class SubtasksService extends EntityCollectionServiceBase<ISubTask>{
    constructor(
        serviceElementsFactory: EntityCollectionServiceElementsFactory
    ) {
        super('SubTask', serviceElementsFactory);
    }

}
