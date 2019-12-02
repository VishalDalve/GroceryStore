import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from 'src/services/storage/local-storage.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  imgURL = '';
  count: number = 0;
  constructor(public lStorage: LocalStorageService) {
  }
  @Input() item: any;
  ngOnInit() {
    this.imgURL = environment.baseURL + this.item.productPic;
    this.count = (this.lStorage.getStorageVal(this.item._id) ?
      JSON.parse(this.lStorage.getStorageVal(this.item._id)) : 0);
  }


  addToCart(productId: string) {
    let list: Array<any>;
    this.count = this.count + 1;
    if (this.lStorage.getStorageVal('cartProductList')) {
      list = JSON.parse(this.lStorage.getStorageVal('cartProductList'));
      if (list.indexOf(productId) === -1) {
        list.push(productId);
        this.lStorage.setStorageVal('cartProductList', JSON.stringify(list));
      }

    } else {
      list = [productId];
      this.lStorage.setStorageVal('cartProductList', JSON.stringify(list));
    }
    this.lStorage.setStorageVal(productId, JSON.stringify(this.count));

  }

}
