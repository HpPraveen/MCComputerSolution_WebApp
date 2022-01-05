import { Order } from './../../Models/Order';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from 'src/app/Services/OrderService';
import { ProductService } from 'src/app/Services/ProductService';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss'],
})
export class CreateOrderComponent implements OnInit {
  constructor(
    public orderService: OrderService,
    public productService: ProductService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    debugger;
    this.productService.GetAllProducts();
    this.orderService.GetAllOrders();
  }
  selectOption(id: number) {
    console.log(id);
  }

  onSubmit(form: NgForm) {
    debugger;
    if (this.orderService.formData.oId == 0) this.insertRecord(form);
    else this.updateRecord(form);
  }

  insertRecord(form: NgForm) {
    this.orderService.CreateOrder().subscribe(
      (res) => {
        this.resetForm(form);
        this.orderService.RefreshOrderList();
        this.toastr.success('Order inserted successfully !');
      },
      (err) => {
        console.log(err);
      }
    );
  }

  updateRecord(form: NgForm) {
    this.orderService.UpdateOrder().subscribe(
      (res) => {
        this.resetForm(form);
        this.orderService.RefreshOrderList();
        this.toastr.success('Order updated successfully !');
      },
      (err) => {
        console.log(err);
      }
    );
  }

  resetForm(form: NgForm) {
    form.form.reset();
    this.orderService.formData = new Order();
  }

  clear() {
    window.location.reload();
  }
}
