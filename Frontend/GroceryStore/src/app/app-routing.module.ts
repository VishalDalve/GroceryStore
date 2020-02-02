import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyCartComponent } from './my-cart/my-cart.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ProductsComponent } from './products/products.component';


const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'MyCart', component: MyCartComponent },
  { path: 'AdminDashboard', component: AdminDashboardComponent },
  { path: 'Products', component: ProductsComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
