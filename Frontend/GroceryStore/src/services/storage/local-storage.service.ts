import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  getStorageVal(ValueString: string): string {
    return localStorage.getItem(ValueString);
  }

  setStorageVal(ValueString: string, Value: string) {
    localStorage.setItem(ValueString, Value);
  }

  clearStorage() {
    localStorage.clear();
  }

}
