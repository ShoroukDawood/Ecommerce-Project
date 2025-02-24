import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../core/services/cart/cart.service';
import { cartProduct } from '../../../shared/interface/cart-product';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  totalPrice: number = 0;
  cartProductList: cartProduct[] = [];
  cartid!: string;
  cartNumber!: number;
  cartOwner!: string;
  constructor(private cart: CartService) { }
ngOnInit(): void {
  this.getProductsInCart();
  // this.updateCart;
}

  getProductsInCart() {
    this.cart.getLoggedUserCart().subscribe({
      next: (res) => {
        console.log(res);
        this.totalPrice = res.data.totalCartPrice;
        this.cartProductList = res.data.products;
        this.cartid = res.cartId;
        this.cart.cartNumber.next(res.numOfCartItems);
        this.cartOwner = res.data.cartOwner;
        localStorage.setItem( 'CartOwner',this.cartOwner);
        console.log('cartOwner:',this.cartOwner);
        
      }
    })
  }

  updateCart(productId:string,count:number) {
    this.cart.updateCart(productId,count).subscribe({
      next: (res) => {
        console.log(res);
        this.totalPrice = res.data.totalCartPrice;
        this.cartProductList = res.data.products;
        this.cart.cartNumber.next(res.numOfCartItems);

      }
    })
  }

  removeProduct(productId:string) {
    this.cart.removeSpecificCartItem(productId).subscribe({
      next: (res) => {
        console.log(res);
        this.totalPrice = res.data.totalCartPrice;
        this.cartProductList = res.data.products;
        this.cart.cartNumber.next(res.numOfCartItems);

      }
    })
  }

  clearAllProducts() {
    this.cart.clearUserData().subscribe({
      next: (res) => {
        console.log(res);
        this.getProductsInCart();
      }
    })
  }
}
