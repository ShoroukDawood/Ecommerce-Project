import { Component, OnInit } from '@angular/core';
import { BrandsService } from '../../../../core/services/brands/brands.service';
import { ActivatedRoute } from '@angular/router';
import { Daum } from '../../../../shared/interface/brands';

@Component({
  selector: 'app-specific-brands',
  imports: [],
  templateUrl: './specific-brands.component.html',
  styleUrl: './specific-brands.component.scss'
})
export class SpecificBrandsComponent implements OnInit {
  id!: string;
  specificBrands!: Daum;
  specificArrayBrands: Daum[]=[];
  constructor(private _ActivatedRoute: ActivatedRoute, private _BrandsService: BrandsService) {
    this._ActivatedRoute.params.subscribe({
      next: (res) => {
        console.log('brandId :',res['id']);
        this.id = res['id'];
      }
    })
  }
  ngOnInit(): void {
    this.getspecificBrand();
    
  }
  getspecificBrand() {
    this._BrandsService.getspecificBrands(this.id).subscribe({
      next: (res)=>{
        console.log(res);
        this.specificBrands = res.data;
        this.specificArrayBrands = res.data;
        console.log('CustomData:',this.specificBrands);
        
      }
    })
  }
}
