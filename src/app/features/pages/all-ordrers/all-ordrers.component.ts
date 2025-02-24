import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../../core/services/orders/orders.service';
import { AuthService } from '../../auth/auth.service';
import { CartItem, Root2, UserOrder } from '../../../shared/interface/user-order';


@Component({
  selector: 'app-all-ordrers',
  templateUrl: './all-ordrers.component.html',
  styleUrl: './all-ordrers.component.scss'
})
export class AllOrdrersComponent implements OnInit {
  userOrder!:Root2;
  cartItems: CartItem[] = [];
  constructor(private orders: OrdersService, private _auth:AuthService) {


   }
ngOnInit(): void {
  this.getUserData();
}
  getUserData() {
    const cartOwner = localStorage.getItem('CartOwner');
    console.log('CartOwner:', cartOwner);

    if (cartOwner) {
      this.orders.getUserOrders(cartOwner).pipe().subscribe({
        next: (res) => {
         if (res.length > 0) {
          const lastOrder = res.sort((a: any, b: any) => 
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )[0];

          this.userOrder = lastOrder; 
          this.cartItems = lastOrder.cartItems || [];

          console.log('Last Order:', this.userOrder);
          console.log('Last Order Items:', this.cartItems);
        } else {
          console.warn('No orders found');
        }
          
        }
      });
    } else {
      console.warn('No CartOwner found in localStorage');
    }
  }

  allOrders() {
    this.orders.getAllOrders().subscribe({
      next: (res) => {
      console.log('All Orders:',res);
      
    }
    })
  }
}