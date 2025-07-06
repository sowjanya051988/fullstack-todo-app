import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Todo } from '../models/todo.model';

@Injectable({ providedIn: 'root' })
export class TodoService {
  private apiUrl = 'http://localhost:3000/api/todos';

  constructor(private http: HttpClient) {}

  getTodos(): Observable<Todo[]> {
    // const token = localStorage.getItem('access_token');
    // if (!token) {
    //   throw new Error('No access token found');
    // }

    // const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<Todo[]>(this.apiUrl).pipe(
      map(todos =>
        todos.map(todo => ({
          ...todo,
          isCompleted: todo.completed === 1,
        }))
      )
    );
  }
}