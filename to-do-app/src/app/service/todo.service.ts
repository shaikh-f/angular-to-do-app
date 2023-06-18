import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { Todo } from '../api/todo';

@Injectable()
export class TodoService {

  private todoUrl = 'api/todos';

  constructor(private http: HttpClient) { }

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.todoUrl)
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  updateStatus(todo: Todo): Observable<Todo>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.todoUrl}/${todo.id}`;
    
    // we use the headers object to configure the options object (third arg. in the put request below)
    return this.http.put<Todo>(url, todo, { headers })
      .pipe(
        tap(() => console.log('updateProduct: ' + todo.id)),
        // Return the product on an update
        map(() => todo),
        catchError(this.handleError)
      );
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    let errorMessage = '';
    
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }

    return throwError(() => errorMessage);
  }
} 
