import { createFeatureSelector, createSelector } from '@ngrx/store';
import { tasksFeatureKey } from '../tasks.constants';
import { TasksInitialState } from '../tasks.models';

const tasksFeatureSelector = createFeatureSelector<TasksInitialState>(tasksFeatureKey);

export const allTaks = createSelector(tasksFeatureSelector, state => {
    return state.tasks;
});
