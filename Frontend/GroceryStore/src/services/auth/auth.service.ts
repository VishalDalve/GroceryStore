import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authSubject = new BehaviorSubject(false);
  isLoggedIn = this.authSubject.asObservable();
  baseUrl = environment.baseURL;
  constructor(private http: HttpClient) { }



  postApiCall(api, params): Observable<any> {
    return this.http.post<any>(this.baseUrl + api, params);
  }

  private handleError(err: HttpErrorResponse) {

    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {

      errorMessage = `An error occurred: ${err.error.message}`;
    } else {

      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }




  updateLoginStatus(flag: boolean) {
    this.authSubject.next(flag);
  }
}
