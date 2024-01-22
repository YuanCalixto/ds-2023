import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HandleMessageError } from '../../util/handle-message-error';
import { Tag } from '../entity/tag';

@Injectable({
  providedIn: 'root',
})
export class TagService extends HandleMessageError {
  constructor(private http: HttpClient, public override snackBar: MatSnackBar) {
    super(snackBar);
  }

  // CREATE

  createTag(tag: any): Observable<Tag> {
    return this.http
      .post<Tag>(`${environment.serverURL}/tags`, tag)
      .pipe(catchError(this.handleError));
  }

  // DELETE

  deleteTag(id: string): Observable<any> {
    return this.http
      .delete(`${environment.serverURL}/tags/${id}`)
      .pipe(catchError(this.handleError));
  }

  // GET

  getAllTags(): Observable<Tag[]> {
    return this.http
      .get<Tag[]>(`${environment.serverURL}/tags`)
      .pipe(catchError(this.handleError));
  }

  getTagById(id: string): Observable<Tag> {
    return this.http
      .get<Tag>(`${environment.serverURL}/tags/${id}`)
      .pipe(catchError(this.handleError));
  }

  getTagsByTaskId(taskId: string): Observable<Tag[]> {
    return this.http
      .get<Tag[]>(`${environment.serverURL}/tags/task/${taskId}`)
      .pipe(catchError(this.handleError));
  }
}
