import { Injectable } from '@angular/core';
import { HandleMessageError } from '../../util/handle-message-error';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, catchError } from 'rxjs';
import { Tarefa } from '../entity/tarefa';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TarefaService extends HandleMessageError {

  constructor(
    private http: HttpClient,
    public override snackBar: MatSnackBar
  ) {
    super(snackBar);
  }

  getAllTarefas(): Observable<Tarefa[]> {
    return this.http.get<Tarefa[]>(`${environment.serverURL}/tarefas`)
      .pipe(catchError(this.capturarErro));
  }

  getTarefaById(id: number): Observable<Tarefa> {
    return this.http.get<Tarefa>(`${environment.serverURL}/tarefas/${id}`)
      .pipe(catchError(this.capturarErro));
  }

  createTarefa(tarefa: Tarefa): Observable<Tarefa> {
    return this.http.post<Tarefa>(`${environment.serverURL}/tarefas`, tarefa)
      .pipe(catchError(this.capturarErro));
  }

  updateTarefa(id: number, tarefa: Tarefa): Observable<Tarefa> {
    return this.http.put<Tarefa>(`${environment.serverURL}/tarefas/${id}`, tarefa)
      .pipe(catchError(this.capturarErro));
  }

  deleteTarefa(id: number): Observable<any> {
    return this.http.delete(`${environment.serverURL}/tarefas/${id}`)
      .pipe(catchError(this.capturarErro));
  }
}
