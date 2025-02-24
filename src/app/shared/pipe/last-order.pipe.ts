import { Pipe, PipeTransform } from '@angular/core';
import { UserOrder } from '../interface/user-order';

@Pipe({
  name: 'lastOrder'
})
export class LastOrderPipe implements PipeTransform {

  transform(orders: any[]): any {
    if (!orders || orders.length === 0) {
      return null; 
    }
    return orders.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )[0];
  }
}
