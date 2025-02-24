import { Component, OnInit } from '@angular/core';
import { BrandsService } from '../../../core/services/brands/brands.service';
import { Daum } from '../../../shared/interface/brands';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-brands',
  imports: [RouterLink],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit {
  brandsList: Daum[]=[];
  constructor(private _brandsservices: BrandsService) { }

  ngOnInit(): void {
    this.getBrands();
  }
  getBrands() {
    this._brandsservices.getAllBrands().subscribe({
      next: (res) => {
        console.log(res);
        this.brandsList = res.data;
        console.log('All Brands',this.brandsList);
        
      }
    })
  }
}
