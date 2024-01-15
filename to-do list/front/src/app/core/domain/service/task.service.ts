import { Injectable } from '@angular/core';
import { HandleMessageError } from '../../util/handle-message-error';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, catchError } from 'rxjs';
import { Task } from '../entity/task';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService extends HandleMessageError {

  constructor(
    private http: HttpClient,
    public override snackBar: MatSnackBar
  ) {
    super(snackBar);
  }

  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${environment.serverURL}/tarefas`)
      .pipe(catchError(this.handleError));
  }

  getTasksById(id: number): Observable<Task> {
    return this.http.get<Task>(`${environment.serverURL}/tarefas/${id}`)
      .pipe(catchError(this.handleError));
  }

  createTasks(task: any): Observable<Task> {
    console.log(task)
    return this.http.post<Task>(`${environment.serverURL}/tarefas`, task)
      .pipe(catchError(this.handleError));
  }

  updateTasks(id: string, tarefa: Task): Observable<Task> {
    return this.http.put<Task>(`${environment.serverURL}/tarefas/${id}`, tarefa)
      .pipe(catchError(this.handleError));
  }  

  deleteTasks(id: string): Observable<any> {
    return this.http.delete(`${environment.serverURL}/tarefas/${id}`)
      .pipe(catchError(this.handleError));
  }

  getTasksByListId(listId: any): Observable<Task[]> {
    return this.http.get<Task[]>(`${environment.serverURL}/tarefas/list/${listId}`)
      .pipe(catchError(this.handleError));
}

}
