import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';
import { Iproduct } from '../iproduct';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})

export class ProductDetailsComponent implements OnInit {

  private productId: string = "";
  public productName : string = "";
  public productDescription : string = "";
  price: number = 0;

  constructor(private router: Router,
              private newService: CommonService,
              private _snackBar: MatSnackBar) { 
    this.productId = this.router.url.split("/")[2];
  }

  ngOnInit() {
    this.newService.getProductById(this.productId).subscribe((data:any)  => {
      this.productName = data.data.pname;
      this.price = data.data.price;
      this.productDescription = data.data.pdescription;
    });
  }

  redirectToProductView(){
    const link = `productedit/${this.productId}`;
    this.router.navigate([link]);
  }


   delete() {
     this.newService.deleteProduct(this.productId)
     .subscribe(data => {
       this._snackBar.open('Record Has been Deleted..!!!',' ', {duration: 2000,});
       const link = `productdashboard`;
       this.router.navigate([link]);
     },
      error =>  error)
   }
  


}
