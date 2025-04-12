// store/actions/list.actions.ts
import { createAction, props } from '@ngrx/store';
import {List, Task} from '../model/list-task.model';

export const loadLists = createAction('[List] Load Lists');
export const loadListsSuccess = createAction('[List] Load Lists Success', props<{ lists: List[] }>());
export const loadListsFailure = createAction('[List] Load Lists Failure', props<{ error: string }>());

export const createList = createAction('[List] Create List', props<{ list: Partial<List> }>());
export const createListSuccess = createAction('[List] Create List Success', props<{ list: List }>());
export const createListFailure = createAction('[List] Create List Failure', props<{ error: string }>());

export const createTask = createAction('[Task] Create Task', props<{ listId: string, task: Partial<Task> }>());
export const createTaskSuccess = createAction('[Task] Create Task Success', props<{ listId: string, task: Task }>());
export const createTaskFailure = createAction('[Task] Create Task Failure', props<{ error: string }>());
