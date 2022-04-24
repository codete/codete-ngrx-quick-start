import { createFeatureSelector, createSelector } from '@ngrx/store';
import { subtasksFeatureKey } from '../subtasks.constants';
import { SubTasksInitialState } from '../subtasks.models';

const subtasksFeatureSelector = createFeatureSelector<SubTasksInitialState>(subtasksFeatureKey);

export const allSubTasks = createSelector(subtasksFeatureSelector, state => {
  return state.subtasks;
});
