import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  productName: string = "";
  productPrice;
  productDescription:string ="";
  productId:string ="";
  productform: FormGroup;

  constructor(private newService: CommonService,
              private router:Router, private _snackBar: MatSnackBar) {

    this.productId = this.router.url.split("/")[2];
    if(this.productId){
      this.newService.getProductById(this.productId).subscribe((data:any)  => {
        this.productName = data.data.pname;
        this.productPrice = data.data.price;
        this.productDescription = data.data.pdescription;
      });
    }
   }
   
   public hasError = (controlName: string, errorName: string) =>{
    return this.productform.controls[controlName].hasError(errorName);
  }

  ngOnInit() {
    this.productform = new FormGroup({
      pname: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      pdescription: new FormControl('', [Validators.required, Validators.maxLength(60)]), 
      price: new FormControl('', [Validators.required, Validators.maxLength(10)]),
    });
  }

  onSave(product, invalid: Boolean) {
    if(this.productId){
      product.mode = "Update";
      product.id = this.productId;
    }
    else{
      product.mode = "Save";
    }
    
     this.newService.saveProduct(product)
       .subscribe(data => {
        this._snackBar.open('Record Has been Saved..!!!',' ', {duration: 2000,});
         const test = `productdashboard`;
         this.router.navigate([test]);
       });
  }

}

