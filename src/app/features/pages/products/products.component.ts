import { Component } from '@angular/core';
import { ProductsService } from '../../../core/services/products/products.service';
import { AllProducts } from '../../../shared/interface/allproducts';
import { CurrencyPipe, DatePipe, UpperCasePipe } from '@angular/common';
import { OnsalePipe } from "../../../shared/pipe/onsale.pipe";
import { FilterPipe } from "../../../shared/pipe/filter.pipe";
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products',
  imports: [UpperCasePipe, CurrencyPipe, DatePipe, OnsalePipe, FilterPipe, FormsModule, RouterLink
    
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  searchValue: string='';
  date = new Date();
  productList: AllProducts[] = [];

  constructor(private _product: ProductsService,private cart:CartService, private toastr: ToastrService) { }
  ngOnInit(): void {
    this.getAllProducts();
  }
  getAllProducts() {
    this._product.getProducts().subscribe({
      next: (res) => {
        this.productList = res.data;
        
        console.log('all data',res.data);
        
      }
    })
  }

  //to add product in cart
  addProduct(productId: string) {
    console.log(productId);
    this.cart.addProductToCart(productId).subscribe({
      next: (res) => {
        this.cart.cartNumber.next(res.numOfCartItems);
        this.toastr.success(res.message, res.status,
          {
            progressAnimation: 'increasing',
            closeButton: true,
            progressBar:true
          });
        console.log(res);
        
      }
    })
  }
}
