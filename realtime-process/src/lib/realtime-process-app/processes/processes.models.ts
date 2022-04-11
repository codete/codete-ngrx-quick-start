import { EntityState } from '@ngrx/entity';

import { IProcess } from "@codete-ngrx-quick-start/shared";
import { type } from 'os';

export interface ProcessesState {
  backgroundOperation: 'nothing' | 'loading-processes' | 'syncing-with-db';
}

export type ProcessesInitialState = EntityState<IProcess> & ProcessesState;
