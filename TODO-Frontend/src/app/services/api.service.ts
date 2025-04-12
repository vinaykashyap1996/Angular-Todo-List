import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { IGetListsResponse, List, Task } from '../model/list-task.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:4000';
  constructor() {}

  list = signal<any>(null);

  getLists(): Observable<IGetListsResponse> {
    return this.http.get<IGetListsResponse>(`${this.baseUrl}/api/`);
  }

  createList(list: any) {
    return this.http.post<List>(`${this.baseUrl}/api/`, list);
  }

  createTask(listId: string, { title, description }: { title: string; description: string }): Observable<Task> {
    return this.http.post<Task>(`${this.baseUrl}/api/${listId}/tasks`, {
      title: title,
      description: description
    });
  }


  getTasksByListId(listId: string): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseUrl}/api/${listId}`);
  }

  modifyTask(listId: string, taskId: string): Observable<Task> {
    return this.http.patch<Task>(`${this.baseUrl}/api/${listId}/tasks/${taskId}`,{});
  }
}
