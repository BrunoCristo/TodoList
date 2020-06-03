import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Todo } from '../models/Todo';
import { Token } from '../models/Token';

const httpOptions = {
  headers : new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

const apiOptions = {
  headers : new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Basic ZGVtbzpzU2R4T1lEQU0zRkJO'
  }),
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todosUrl:string =  'https://jsonplaceholder.typicode.com/todos';
  todosLimit = '?_limit=5'

  constructor(private http:HttpClient) {
  }

  getToken():Observable<Token[]> {
    return this.http.post<Token[]>('https://api-fluig.staging.totvs.app/accounts/oauth/token?grant_type=password&response_type=token&client_id=demo&username=bruno.cristofolini@desafiofluig.com&password=Bruno@123', null, apiOptions);
  }

  getTodos():Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.todosUrl}${this.todosLimit}`);
  }

  deleteTodo(todo:Todo):Observable<Todo> {
    const url = `${this.todosUrl}/${todo.id}`;
    return this.http.delete<Todo>(url, httpOptions);
  }

  addTodo(todo:Todo):Observable<Todo> {
    return this.http.post<Todo>(this.todosUrl, todo, httpOptions);
  }

  editTodo(todo:Todo):Observable<Todo> {
    return this.http.post<Todo>(this.todosUrl, todo, httpOptions);
  }

  toggleCompleted(todo: Todo):Observable<any> {
    const url = `${this.todosUrl}/${todo.id}`;
    return this.http.put(url, todo, httpOptions);
  }
}
