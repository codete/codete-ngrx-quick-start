import { createFeatureSelector, createSelector } from '@ngrx/store';
import { processesFeatureKey } from '../processes.constants';
import { ProcessesInitialState } from '../processes.models';
import { adapter } from '../reducers/processes.reducers';

const processesFeatureSelector = createFeatureSelector<ProcessesInitialState>(processesFeatureKey);

const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors();

export const allProceses = createSelector(processesFeatureSelector, selectAll);

export const isLoadingProcesses = createSelector(processesFeatureSelector, state => {
  return state.backgroundOperation === 'loading-processes';
});

export const isSyncingProcesses = createSelector(processesFeatureSelector, state => {
  return state.backgroundOperation === 'syncing-with-db';
});
