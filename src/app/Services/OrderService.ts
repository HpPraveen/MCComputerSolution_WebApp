import { Order } from './../Models/Order';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { UrlsConfig } from '../Shared/UrlConfig';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  readonly baseURL = UrlsConfig.rootUrl+"Order";
  formData: Order = new Order();
  orderList: Order[] = [];

  constructor(private http: HttpClient) { }

  GetAllOrders() {
    debugger
    return this.http.get<Order[]>(this.baseURL);
  }

  SearchOrders(orderNumber: string) {
    debugger
    this.http.get(`${this.baseURL}/${orderNumber}`)
      .toPromise()
      .then(res =>this.orderList = res as Order[]);
  }

  CreateOrder() {
    debugger
    return this.http.post(this.baseURL, this.formData);
  }

  UpdateOrder() {
    return this.http.put(this.baseURL, this.formData);
  }

  DeleteOrder(orderId: number) {
    return this.http.delete(`${this.baseURL}/${orderId}`);
  }

  RefreshOrderList() {
    this.http.get(this.baseURL)
      .toPromise()
      .then(res =>this.orderList = res as Order[]);
  }
}
