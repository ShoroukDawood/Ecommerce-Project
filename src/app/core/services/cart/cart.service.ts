import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { baseUrl } from '../../constant/baseUrl';
import { platformBrowser } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';
import { Checkout } from '../../../shared/interface/checkout';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  token: any;
  cartNumber: BehaviorSubject<any> = new BehaviorSubject<any>(0);

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) Id: object) {
    if (isPlatformBrowser(Id)) {
      this.token = { token: localStorage.getItem('UserToken')! };
    }
    this.getLoggedUserCart().subscribe({
      next: (res) => {
        this.cartNumber.next(res.numOfCartItems);
      }
    })
   }
  
  addProductToCart(productId:string): Observable<any>{
    return this.http.post(`${baseUrl.BaseUrl}/cart`,
     {productId:productId})
  }
 getLoggedUserCart(): Observable<any>{
    return this.http.get(`${baseUrl.BaseUrl}/cart`)
  }
  updateCart(productId:string,count:number): Observable<any>{
    return this.http.put(`${baseUrl.BaseUrl}/cart/${productId}`,
    {count:count}
    )
  }
  removeSpecificCartItem(productId:string): Observable<any>{
    return this.http.delete(`${baseUrl.BaseUrl}/cart/${productId}`)
  }
  clearUserData(): Observable<any>{
    return this.http.delete(`${baseUrl.BaseUrl}/cart`)
    
  }
  checkout(cartId:string,payload:string): Observable<any>{
    return this.http.post(`${baseUrl.BaseUrl}/orders/checkout-session/${cartId}?url=http://localhost:4200/`,
    {
      shippingAddress: payload
      }
    )
  }
}
