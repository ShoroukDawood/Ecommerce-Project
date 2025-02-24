import { Pipe, PipeTransform } from '@angular/core';
import { AllProducts } from '../interface/allproducts';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(product: AllProducts[], searchValue: string): AllProducts[] {
    
    return product.filter((product) => {
      return product.title.toUpperCase().includes(searchValue.toUpperCase());
    })
  }

}
