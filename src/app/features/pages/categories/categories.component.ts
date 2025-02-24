import { Component, NgModule } from '@angular/core';
import { CategoriesService } from '../../../core/services/categories/categories.service';
import { Category, AllProducts } from '../../../shared/interface/allproducts';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-categories',
  imports: [RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {

  categoriesList: Category[] = [];
  productList: AllProducts[] = [];
  displayedProducts: AllProducts[] = [];
  constructor(private categories: CategoriesService) { }
  
  ngOnInit(): void {
    this.allCategories();
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
  getSpecificCategory(categoryId:string) {
    this.categories.getSpecificGategories(categoryId).subscribe({
      next: (res) => {
        console.log(res);
        
      }
    })
  }

}