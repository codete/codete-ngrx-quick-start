import { Injectable } from '@angular/core';
import {
    EntityCollectionServiceBase,
    EntityCollectionServiceElementsFactory
} from '@ngrx/data';

import { Task } from '@codete-ngrx-quick-start/shared';

@Injectable({ providedIn: 'root' })
export class TasksService extends EntityCollectionServiceBase<Task> {

    constructor(
        serviceElementsFactory: EntityCollectionServiceElementsFactory
    ) {
        super('Task', serviceElementsFactory);
    }

}
