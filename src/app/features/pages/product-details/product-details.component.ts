import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../core/services/products/products.service';
import { AllProducts } from '../../../shared/interface/allproducts';
import { CartService } from '../../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {
  id: any;
  productDetails!: AllProducts;
  constructor(private activatedRoute: ActivatedRoute,private product:ProductsService, private cart:CartService, private toastr:ToastrService) {
    activatedRoute.params.subscribe(res => {
      console.log(res['id']);
      this.id = res['id'];
      
    })
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getSpecificProducts();
  }
  getSpecificProducts() {
    this.product.getProductDetails(this.id).subscribe({
      next: (res) => {
        console.log(res);
        
        this.productDetails = res.data;
        console.log('Specific Product',this.productDetails);
        
        
      }
    })
  }
  addProduct(productId: string) {
    console.log(productId);
    this.cart.addProductToCart(productId).subscribe({
      next: (res) => {
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
