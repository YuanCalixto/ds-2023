import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HandleMessageError } from '../../util/handle-message-error';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends HandleMessageError {
  constructor(private http: HttpClient, public override snackBar: MatSnackBar) {
    super(snackBar);
  }

  // FUNCTIONAL

  login(loginData: { login: string; password: string }): Observable<any> {
    return this.http
      .post<any>(`${environment.serverURL}/auth/login`, loginData)
      .pipe(catchError(this.handleError));
  }

  register(registerData: { login: string; password: string }): Observable<any> {
    return this.http
      .post<any>(`${environment.serverURL}/auth/register`, registerData)
      .pipe(catchError(this.handleError));
  }

  // SAMPLE

  loginSample(loginData: { login: string; password: string }): Observable<any> {
    return this.http
      .post<any>(`${environment.serverURL}/users/login`, loginData)
      .pipe(catchError(this.handleError));
  }

  registerSample(registerData: {
    login: string;
    password: string;
  }): Observable<any> {
    return this.http
      .post<any>(`${environment.serverURL}/users/register`, registerData)
      .pipe(catchError(this.handleError));
  }
}
