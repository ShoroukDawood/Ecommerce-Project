import { Component } from '@angular/core';
import { CategoriesService } from '../../../../core/services/categories/categories.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ProductsService } from '../../../../core/services/products/products.service';
import { Category, AllProducts } from '../../../../shared/interface/allproducts';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-categories-blocks',
  imports: [NgFor, CarouselModule],
  templateUrl: './categories-blocks.component.html',
  styleUrl: './categories-blocks.component.scss'
})
export class CategoriesBlocksComponent {
   customOptions: OwlOptions = {
     rtl:true,
     loop: true,
     mouseDrag: false,
     touchDrag: false,
     pullDrag: false,
     dots: false,
     navSpeed: 700,
     navText: ['', ''],
     responsive: {
       0: {
         items: 1
       },
       400: {
         items: 2
       },
       740: {
         items: 3
       },
       940: {
         items: 7
       }
     },
     nav: true
   }
 categoriesList: Category[] = [];
   productList: AllProducts[] = [];
   displayedProducts: AllProducts[] = [];
   constructor(private categories: CategoriesService, private _ProductsService:ProductsService) { }
   
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
 }
 
