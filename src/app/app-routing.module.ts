import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductDashboardComponent } from './product-dashboard/product-dashboard.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
//import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductAddComponent } from './product-add/product-add.component';


const routes: Routes = [
  { path: '', redirectTo: '/productdashboard', pathMatch:'full'},
  { path: 'productdashboard', component: ProductDashboardComponent },
  { path: 'productdetails/:productId', component: ProductDetailsComponent },
  { path: 'productedit/:productId', component: ProductAddComponent },
  { path: 'productadd', component: ProductAddComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
