import { Injectable } from '@angular/core';
import { HandleMessageError } from '../../util/handle-message-error';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, catchError } from 'rxjs';
import { Lists } from '../entity/lists';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListsService extends HandleMessageError {

  constructor(
    private http: HttpClient,
    public override snackBar: MatSnackBar
  ) {
    super(snackBar);
  }

  getAllLists(): Observable<Lists[]> {
    return this.http.get<Lists[]>(`${environment.serverURL}/lists`)
      .pipe(catchError(this.capturarErro));
  }

  getAllListsByUser(userId: number): Observable<Lists[]> {
    return this.http.get<Lists[]>(`${environment.serverURL}/lists?userId=${userId}`)
      .pipe(catchError(this.capturarErro));
  }

  getListById(id: number): Observable<Lists> {
    return this.http.get<Lists>(`${environment.serverURL}/lists/${id}`)
      .pipe(catchError(this.capturarErro));
  }

  createList(list: Lists): Observable<Lists> {
    return this.http.post<Lists>(`${environment.serverURL}/lists`, list)
      .pipe(catchError(this.capturarErro));
  }

  updateList(id: number, list: Lists): Observable<Lists> {
    return this.http.put<Lists>(`${environment.serverURL}/lists/${id}`, list)
      .pipe(catchError(this.capturarErro));
  }

  deleteList(id: number): Observable<any> {
    return this.http.delete(`${environment.serverURL}/lists/${id}`)
      .pipe(catchError(this.capturarErro));
  }
}
