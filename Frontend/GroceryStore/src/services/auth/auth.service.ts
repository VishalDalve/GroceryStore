import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authSubject = new BehaviorSubject(false);
  isLoggedIn = this.authSubject.asObservable();

  constructor() { }

  updateLoginStatus(flag: boolean) {
    this.authSubject.next(flag);
  }
}
