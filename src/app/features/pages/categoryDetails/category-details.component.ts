import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../../core/services/categories/categories.service';
import { ActivatedRoute } from '@angular/router';
import { Data } from '../../../shared/interface/categories';
import { Daum } from '../../../shared/interface/subcategory';

@Component({
  selector: 'app-category-details',
  imports: [],
templateUrl: './category-details.component.html',
  styleUrl: './category-details.component.scss'
})
export class CategoryDetailsComponent implements OnInit{
  categoryDetails!: Data;
  SubcategoryDetails: Daum[]=[];
  id!: string;
  
  constructor(private _categorydetailed: CategoriesService, private _ActivatedRoute: ActivatedRoute) {
    _ActivatedRoute.params.subscribe(res => {
      console.log('Category Id:',res['id']);
      this.id = res['id'];
      
    })
  }
  
  ngOnInit(): void {
 
    this.getSpecificCategory();
     this.getSubCategories()
  }
 getSpecificCategory() {
   this._categorydetailed.getSpecificGategories(this.id).subscribe({      
      next: (res) => {
        console.log(res);
        this.categoryDetails = res.data;
        console.log('Category Details',this.categoryDetails);
        
      }
    })
  }
 getSubCategories() {
   this._categorydetailed.getSubCategories(this.id).subscribe({      
      next: (res) => {
        console.log(res);
        this.SubcategoryDetails = res.data;
        console.log('Sub Category Details',this.SubcategoryDetails);
        
      }
    })
  }
}
