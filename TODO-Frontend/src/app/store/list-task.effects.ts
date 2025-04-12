// store/effects/list.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ListActions from './list-task.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import {ApiService} from '../services/api.service';
import { List } from '../model/list-task.model';

interface IGetListsResponse { 
  success: boolean,
  message: string,
  data: {
    lists: List[]
  }
}
@Injectable()
export class ListEffects {
  constructor(private actions$: Actions, private api: ApiService) {}

  loadLists$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ListActions.loadLists),
      mergeMap(() =>
        this.api.getLists().pipe(
          map((response: IGetListsResponse) => 
            ListActions.loadListsSuccess({ lists: response.data.lists })
          ),
          catchError((err: any) => 
            of(ListActions.loadListsFailure({ error: err.message }))
          )
        )
      )
    )
  );

  createList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ListActions.createList),
      mergeMap(action =>
        this.api.createList(action.list).pipe(
          map(list => ListActions.createListSuccess({ list })),
          catchError(err => of(ListActions.createListFailure({ error: err.message })))
        )
      )
    )
  );

  createTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ListActions.createTask),
      mergeMap(action =>
        this.api.createTask(action.listId, { 
          title: action.task.title || '', 
          description: action.task.description || '' 
        }).pipe(
          map(task => ListActions.createTaskSuccess({ listId: action.listId, task })),
          catchError(err => of(ListActions.createTaskFailure({ error: err.message })))
        )
      )
    )
  );
}
