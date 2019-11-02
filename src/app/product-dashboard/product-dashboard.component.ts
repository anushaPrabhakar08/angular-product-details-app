import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';
import { Router } from '@angular/router';
import { Iproduct } from '../iproduct';


const ELEMENT_DATA: Iproduct[] = [];

@Component({
  selector: 'app-product-dashboard',
  templateUrl: './product-dashboard.component.html',
  styleUrls: ['./product-dashboard.component.css']
})

export class ProductDashboardComponent implements OnInit {
  pname: string;
  price: number;

  Repdata;
  constructor(private newService: CommonService,
              private router: Router) { }
  displayedColumns: string[] = ['pname', 'price'];
  dataSource = ELEMENT_DATA;

  ngOnInit() {
    this.newService.getProduct().subscribe((data:Iproduct[])  => {
      this.dataSource = data;
      console.log(data)
    });
  }

  redirectToProductView(productId: string){
    const test = `productdetails/${productId}`;
    this.router.navigate([test]);
  }

}
