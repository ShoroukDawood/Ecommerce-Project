import { Component, OnInit } from '@angular/core';
import { ProductsComponent } from "../products/products.component";
import { CategoriesService } from '../../../core/services/categories/categories.service';
import { Category } from '../../../shared/interface/categories';
import { ProductsService } from '../../../core/services/products/products.service';
import { AllProducts } from '../../../shared/interface/allproducts';
import { HomepageSliderComponent } from "../homepage-slider/homepage-slider.component";
import { CategoriesComponent } from "../categories/categories.component";
import { RouterLink } from '@angular/router';
import { CartService } from '../../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { CategoriesBlocksComponent } from "../categoriesBlocks/categories-blocks/categories-blocks.component";


@Component({
  selector: 'app-home',
  imports: [HomepageSliderComponent, CategoriesComponent, RouterLink, CategoriesBlocksComponent],
templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  categoriesList: Category[] = [];
  productList: AllProducts[] = [];
  displayedProducts: AllProducts[] = [];
  constructor(private categories: CategoriesService, private _ProductsService:ProductsService, private toastr: ToastrService, private cart:CartService) { }
  
  ngOnInit(): void {
    this.allCategories();
   this.specificNumberOfProducts()
  }

  allCategories() {
    this.categories.getCategories().subscribe({
      next: (res) => {
        this.categoriesList = res.data;
        console.log(this.categoriesList);
        
        
      },
      error: (err) => {
        console.error("Error fetching categories:", err);
      }
    })
  }

    specificNumberOfProducts() {
    this._ProductsService.getProducts().subscribe({
      next: (res) => {
        this.productList = res.data;
        this.displayedProducts = this.productList.slice(0, 12); 
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      }
    });
  }
    //to add product in cart
  addProduct(productId: string) {
    console.log(productId);
    this.cart.addProductToCart(productId).subscribe({
      next: (res) => {
        this.cart.cartNumber.next(res.numOfCartItems);
        console.log(res);
        this.toastr.success(res.message, res.status,
          {
            progressAnimation: 'increasing',
            closeButton: true,
            progressBar:true
          });
      }
    })
  }

  //toaster
    showSuccess() {
    this.toastr.success('Hello world!', 'Toastr fun!');
  }
  }

