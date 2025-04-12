// store/reducers/list.reducer.ts
import { createReducer, on } from '@ngrx/store';
import {ListState} from '../model/list-task.model';
import * as ListActions from './list-task.actions';

const initialState: ListState = {
  lists: [],
  loading: false,
  error: null,
};

export const listReducer = createReducer(
  initialState,

  on(ListActions.loadLists, (state) => ({ ...state, loading: true })),
  on(ListActions.loadListsSuccess, (state, { lists }) => ({ ...state, loading: false, lists })),
  on(ListActions.loadListsFailure, (state, { error }) => ({ ...state, loading: false, error })),

  on(ListActions.createListSuccess, (state, { list }) => ({
    ...state,
    lists: [...state.lists, list]
  })),

  on(ListActions.createTaskSuccess, (state, { listId, task }) => ({
    ...state,
    lists: state.lists.map(list =>
      list.id === listId
        ? { ...list, tasks: [...list.tasks, task] }
        : list
    )
  }))
);
