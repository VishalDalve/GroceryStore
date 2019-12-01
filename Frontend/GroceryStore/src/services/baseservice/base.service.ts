import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { post } from 'selenium-webdriver/http';
import { puts } from 'util';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  baseUrl = environment.baseURL;

  constructor(private http: HttpClient) { }

  post(api: string, params: any) {
    return this.http.post<any>(this.baseUrl + api, params);
  }

  get(api: string, params: any) {
    return this.http.get<any>(this.baseUrl + api, params);
  }

  put() {

  }
}
