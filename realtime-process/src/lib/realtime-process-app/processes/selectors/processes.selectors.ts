import { Process } from '@codete-ngrx-quick-start/shared';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { processesFeatureKey } from '../processes.constants';
import { ProcessesInitialState } from '../processes.models';
import { selectAll } from '../reducers/processes.reducers';

const processesFeatureSelector = createFeatureSelector<ProcessesInitialState>(processesFeatureKey);


const all = createSelector(processesFeatureSelector, selectAll);

export const allProceses = createSelector(all, s => s.map(p => Process.from(p)));

export const isLoadingProcesses = createSelector(processesFeatureSelector, state => {
  return state.backgroundOperation === 'loading-processes';
});

export const isSyncingProcesses = createSelector(processesFeatureSelector, state => {
  return state.backgroundOperation === 'syncing-with-db';
});
