import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { getApiBaseUrl } from 'src/app/shared/shared.functions';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(protected http: HttpClient) {}

  private formatErrors(error: any) {
    console.error(error);
    return throwError(error);
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http
      .get(`${getApiBaseUrl()}${path}`, { params })
      .pipe(catchError(this.formatErrors));
  }

  getWithBlobResponse(path: string, params = {}): Observable<any> {
    return this.http
      .get(`${getApiBaseUrl()}${path}`, { responseType: 'blob', headers: {Accept : '*/*', 'content-type' : '*/*'}, ...params })
      .pipe(catchError(this.formatErrors));
  }

  put(path: string, body: any = {}): Observable<any> {
    return this.http
      .put(`${getApiBaseUrl()}${path}`, JSON.stringify(body))
      .pipe(catchError(this.formatErrors));
  }

  putFormData(path: string, body: any): Observable<any> {
    return this.http
      .put(`${getApiBaseUrl()}${path}`, body)
      .pipe(catchError(this.formatErrors));
  }

  patchFormData(path: string, body: any): Observable<any> {
    return this.http
      .patch(`${getApiBaseUrl()}${path}`, body)
      .pipe(catchError(this.formatErrors));
  }

  patch(path: string, body: any = {}): Observable<any> {
    return this.http
      .patch(`${getApiBaseUrl()}${path}`, JSON.stringify(body))
      .pipe(catchError(this.formatErrors));
  }

  postFormData(path: string, body: any = {}): Observable<any> {
    return this.http
      .post(`${getApiBaseUrl()}${path}`, body)
      .pipe(catchError(this.formatErrors));
  }

  post(
    path: string,
    body: any = {},
    options = {},
    formData = false
  ): Observable<any> {
    return this.http
      .post(
        `${getApiBaseUrl()}${path}`,
        formData ? body : JSON.stringify(body),
        options
      )
      .pipe(catchError(this.formatErrors));
  }

  postWithProgress(
    path: string,
    body: any = {},
    options = {}
  ): Observable<any> {
    const req = new HttpRequest('POST', path, body, {
      reportProgress: true,
    });
    return this.http.request(req).pipe(catchError(this.formatErrors));
  }

  delete(path: any): Observable<any> {
    return this.http
      .delete(`${getApiBaseUrl()}${path}`)
      .pipe(catchError(this.formatErrors));
  }
}
