import { Injectable } from '@angular/core';
import { HandleMessageError } from '../../util/handle-message-error';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, catchError } from 'rxjs';
import { Tasks } from '../entity/tasks';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TasksService extends HandleMessageError {

  constructor(
    private http: HttpClient,
    public override snackBar: MatSnackBar
  ) {
    super(snackBar);
  }

  getAllTasks(): Observable<Tasks[]> {
    return this.http.get<Tasks[]>(`${environment.serverURL}/tarefas`)
      .pipe(catchError(this.capturarErro));
  }

  getTasksById(id: number): Observable<Tasks> {
    return this.http.get<Tasks>(`${environment.serverURL}/tarefas/${id}`)
      .pipe(catchError(this.capturarErro));
  }

  createTasks(tarefa: Tasks): Observable<Tasks> {
    return this.http.post<Tasks>(`${environment.serverURL}/tarefas`, tarefa)
      .pipe(catchError(this.capturarErro));
  }

  updateTasks(id: number, tarefa: Tasks): Observable<Tasks> {
    return this.http.put<Tasks>(`${environment.serverURL}/tarefas/${id}`, tarefa)
      .pipe(catchError(this.capturarErro));
  }

  deleteTasks(id: number): Observable<any> {
    return this.http.delete(`${environment.serverURL}/tarefas/${id}`)
      .pipe(catchError(this.capturarErro));
  }

  getTasksByListId(listId: number): Observable<Tasks[]> {
    return this.http.get<Tasks[]>(`${environment.serverURL}/tarefas?listId=${listId}`)
      .pipe(catchError(this.capturarErro));
  }
}
