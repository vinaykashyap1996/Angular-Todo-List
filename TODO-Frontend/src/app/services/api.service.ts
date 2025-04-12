import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:4000'; // Replace with your actual API URL
  constructor() {}

  list = signal<any>(null);

  getLists(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/api/`);
  }

  createList(list: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/api/`, list);
  }

  getTasksByListId(listId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/api/${listId}`);
  }
}
