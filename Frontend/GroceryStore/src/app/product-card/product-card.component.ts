import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  imgURL = '';
  constructor() { }
  @Input() item: any;
  ngOnInit() {
    this.imgURL = environment.baseURL + this.item.productPic
  }

}
