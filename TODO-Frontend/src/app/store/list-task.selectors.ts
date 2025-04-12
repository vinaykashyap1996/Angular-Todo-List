import { createFeatureSelector, createSelector } from '@ngrx/store';
import {ListState} from '../model/list-task.model';

const selectListState = createFeatureSelector<ListState>('list');

export const selectAllLists = createSelector(selectListState, (state) => state.lists);
export const selectLoading = createSelector(selectListState, (state) => state.loading);
export const selectError = createSelector(selectListState, (state) => state.error);
