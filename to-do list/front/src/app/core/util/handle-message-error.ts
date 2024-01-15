import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

export abstract class HandleMessageError {

  protected constructor(public snackBar: MatSnackBar) {
  }

  public handleError(errorResponse: HttpErrorResponse): Observable<never> {
    let objError;
    if (errorResponse.statusText === 'Unknown Error') {
      return throwError('Servidor indisponível!');
    }
    if (typeof errorResponse?.error === 'object') {
      objError = errorResponse?.error;
    } else if (typeof errorResponse?.error === 'string') {
      objError = JSON.parse(errorResponse?.error);
    } else if (typeof errorResponse === 'string') {
      return throwError(errorResponse);
    }

    return throwError(objError?.errors || objError?.message || errorResponse?.error?.message
      || 'Ocorreu um erro durante a requisição, comunique o administrador do sistema.');
  }

  showMessage(msg: string, isError = false): void {
    this.snackBar.open(msg, 'X', {
      duration: (isError ? 5000 : 4000)
    });
  }

}
