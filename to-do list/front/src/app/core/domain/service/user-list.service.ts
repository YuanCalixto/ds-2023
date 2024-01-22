import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HandleMessageError } from '../../util/handle-message-error';
import { UserList } from '../entity/user-list';

@Injectable({
  providedIn: 'root',
})
export class UserListService extends HandleMessageError {
  constructor(private http: HttpClient, public override snackBar: MatSnackBar) {
    super(snackBar);
  }

  // CREATE

  createUserList(userList: any): Observable<UserList> {
    return this.http
      .post<UserList>(`${environment.serverURL}/userLists`, userList)
      .pipe(catchError(this.handleError));
  }

  // DELETE

  deleteUserList(userListId: number): Observable<void> {
    return this.http
      .delete<void>(`${environment.serverURL}/userLists/${userListId}`)
      .pipe(catchError(this.handleError));
  }

  // GET

  getAllUserLists(): Observable<any> {
    return this.http
      .get<any>(`${environment.serverURL}/userLists/all`)
      .pipe(catchError(this.handleError));
  }

  getUserListByUser(userId: string): Observable<UserList[]> {
    return this.http
      .post<UserList[]>(
        `${environment.serverURL}/userLists/user/${userId}`,
        null
      )
      .pipe(catchError(this.handleError));
  }
}
