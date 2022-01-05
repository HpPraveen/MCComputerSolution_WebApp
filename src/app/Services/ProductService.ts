import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { UrlsConfig } from '../Shared/UrlConfig';
import { Product } from '../Models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  readonly baseURL = UrlsConfig.rootUrl+"Product";
  formData: Product = new Product();
  productList: Product[] = [];

  constructor(private http: HttpClient) { }

  GetAllProducts() {
    debugger
    return this.http.get(this.baseURL)
    .toPromise()
    .then(res =>this.productList = res as Product[]);
  }

   RefreshProductList() {
    this.http.get(this.baseURL)
      .toPromise()
      .then(res =>this.productList = res as Product[]);
  }
}
