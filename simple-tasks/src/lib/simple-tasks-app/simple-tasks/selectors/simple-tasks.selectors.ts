import { SimpleTask } from '@codete-ngrx-quick-start/shared';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { simpleTasksFeatureKey } from '../simple-tasks.constants';
import { SimpleTasksInitialState } from '../simple-tasks.models';

const tasksFeatureSelector = createFeatureSelector<SimpleTasksInitialState>(simpleTasksFeatureKey);

export const allSimpleTasks = createSelector(tasksFeatureSelector, state => {
  return state.simpleTasks.map(t => SimpleTask.from(t));
});

export const loveFirstEnable = createSelector(tasksFeatureSelector, state => {
  return state.loveFirst;
});
