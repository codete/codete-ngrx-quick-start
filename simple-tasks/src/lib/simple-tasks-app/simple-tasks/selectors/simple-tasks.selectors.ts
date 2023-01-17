import { createFeatureSelector, createSelector } from '@ngrx/store';
import { simpleTasksFeatureKey } from '../simple-tasks.constants';
import { SimpleTasksInitialState } from '../simple-tasks.models';

const tasksFeatureSelector = createFeatureSelector<SimpleTasksInitialState>(simpleTasksFeatureKey);

export const allSimpleTasks = createSelector(tasksFeatureSelector, state => {
    return state.simpleTasks;
});
