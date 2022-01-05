import { Order } from './../../Models/Order';
import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/Services/OrderService';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent implements OnInit {
  orderList: Order[] = [];
  constructor(
    public orderService: OrderService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    debugger;
    this.orderService.RefreshOrderList();
  }

  populateForm(selectedRecord: Order) {
    this.orderService.formData = Object.assign({}, selectedRecord);
  }

  onDelete(id: number) {
    debugger;
    if (confirm('Are you sure to delete this Order?')) {
      this.orderService.DeleteOrder(id).subscribe(
        (res) => {
          this.orderService.RefreshOrderList();
          this.toastr.error('Order deleted successfully!');
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  search() {
    var searchTxt = (document.getElementById('searchTxt') as HTMLInputElement)
      .value;
    this.orderService.SearchOrders(searchTxt);
  }
}
