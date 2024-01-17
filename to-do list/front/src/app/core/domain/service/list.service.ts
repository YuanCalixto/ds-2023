import { Injectable } from '@angular/core';
import { HandleMessageError } from '../../util/handle-message-error';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, catchError } from 'rxjs';
import { List } from '../entity/list';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListService extends HandleMessageError {

  constructor(
    private http: HttpClient,
    public override snackBar: MatSnackBar
  ) {
    super(snackBar);
  }

  getAllLists(): Observable<List[]> {
    return this.http.get<List[]>(`${environment.serverURL}/lists`)
      .pipe(catchError(this.handleError));
  }

  getAllListsByUser(userId: string): Observable<List[]> {
    return this.http.post<List[]>(`${environment.serverURL}/lists/user/${userId}`, null)
      .pipe(catchError(this.handleError));
  }

  getListById(id: number): Observable<List> {
    return this.http.get<List>(`${environment.serverURL}/lists/${id}`)
      .pipe(catchError(this.handleError));
  }

  createList(list: any): Observable<List> {
    return this.http.post<List>(`${environment.serverURL}/lists`, list)
      .pipe(catchError(this.handleError));
  }

  updateList(id: number, list: List): Observable<List> {
    return this.http.put<List>(`${environment.serverURL}/lists/${id}`, list)
      .pipe(catchError(this.handleError));
  }

  deleteList(id: string): Observable<any> {
    return this.http.delete(`${environment.serverURL}/lists/${id}`)
      .pipe(catchError(this.handleError));
  }
}
