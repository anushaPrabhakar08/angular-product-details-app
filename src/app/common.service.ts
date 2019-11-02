import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient) { }

  saveProduct(product) {
    return this.http.post('http://localhost:3000/api/saveProduct/', product);
  }

  getProduct() {
    return this.http.get('http://localhost:3000/api/getProduct');
  }

  deleteProduct(productId){
    //debugger;
    return this.http.delete('http://localhost:3000/api/deleteProduct?productId=' +productId);
  }

  getProductById(productId) {
    return this.http.get('http://localhost:3000/api/getProductById?productId=' +productId);
  }
}        
   