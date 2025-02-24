import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../../core/services/cart/cart.service';

@Component({
  selector: 'app-chechout',
  imports: [ReactiveFormsModule],
 templateUrl: './chechout.component.html',
  styleUrl: './chechout.component.scss'
})
export class ChechoutComponent {
  cartId!: string;
  constructor(private _activatedRoutes: ActivatedRoute, private cart:CartService) {
    _activatedRoutes.params.subscribe({
      next: (res) => {
        console.log("result:"+res['id']);
        this.cartId = res['id'];

      }
    })
  }
  checkoutForm: FormGroup = new FormGroup({
    details: new FormControl(null),
    phone: new FormControl(null),
    city: new FormControl(null),
  })
  submit() {
    this.cart.checkout(this.cartId, this.checkoutForm.value).subscribe({
      next: (res) => {
        console.log(res);
        window.location.href = res.session.url;

        
      }, error:(er)=>{
        console.log("error");
          window.location.href = er.session.cancel_url;
        
      }
    
  })
}
}
