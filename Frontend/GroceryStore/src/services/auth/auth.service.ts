import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { BaseService } from '../baseservice/base.service';
import { API_URLS } from 'src/app/util/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authSubject = new BehaviorSubject(false);
  isLoggedIn = this.authSubject.asObservable();
  baseUrl = environment.baseURL;

  constructor(
    private baseService: BaseService
  ) { }



  login(params: any): Observable<any> {
    return this.baseService.post(API_URLS.login, params);
    //return this.http.post<any>(this.baseUrl + api, params);
  }

  signup(params): Observable<any> {
    return this.baseService.post(API_URLS.signup, params);
    //return this.http.post<any>(this.baseUrl + api, params);
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
