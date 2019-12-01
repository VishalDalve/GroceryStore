import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/services/product/product.service';
import { ToastmsgService } from 'src/services/toaster/toastmsg.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  productsParam = { perPage: 10, page: 1 };
  loading = false;
  productsList = [];
  constructor(
    private productService: ProductService,
    private toast: ToastmsgService
  ) { }

  ngOnInit() {
    this.loadProducts()
  }

  loadProducts() {
    this.loading = true;
    this.productService.getProduct(this.productsParam).subscribe(
      (res: any) => {
        // console.log(res);
        this.productsList = [...this.productsList, ...res.products];
        this.loading = false;
      },
      (error) => {
        console.log('Err =>', error);
        this.loading = false;
        this.toast.error('Something Went Wrong');
      }
    )
  }

}
