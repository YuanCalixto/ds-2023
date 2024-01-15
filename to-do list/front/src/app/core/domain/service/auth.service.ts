
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  login(loginData: { login: string; password: string }): Observable<any> {
    return this.http
      .post<any>(`${environment.serverURL}/auth/login`, loginData)
      .pipe(catchError(this.handleError));
  }

  loginSample(loginData: { login: string; password: string }): Observable<any> {
    return this.http
      .post<any>(`${environment.serverURL}/users/login`, loginData)
      .pipe(catchError(this.handleError));
  }

  register(registerData: { login: string; password: string }): Observable<any> {
    return this.http
      .post<any>(`${environment.serverURL}/auth/register`, registerData)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    console.error('Erro na requisição:', error);

    let errorMessage = 'Erro no servidor';

    if (error.error && error.error.message) {
      errorMessage = error.error.message;
    } else if (error.status === 404 && error.error && error.error.error === 'User not found') {
      errorMessage = 'Usuário não encontrado';
    }

    return throwError(errorMessage);
  }
}
