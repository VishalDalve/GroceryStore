import { Injectable } from '@angular/core';
import { BaseService } from '../baseservice/base.service';
import { API_URLS } from 'src/app/util/constants';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private baseService: BaseService) { }

  getProduct(param: any) {
    return this.baseService.get(API_URLS.getproduct, param)

  }
}
