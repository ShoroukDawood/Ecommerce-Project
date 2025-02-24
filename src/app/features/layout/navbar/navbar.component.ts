import { Component, Input, OnInit } from '@angular/core';
import { FlowbiteServiceService } from '../../../core/services/flowbite/flowbite-service.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { CartService } from '../../../core/services/cart/cart.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MyTranslateService } from '../../../core/services/myTranslate/my-translate.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink,RouterLinkActive, TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{
  isLogin: boolean = false;
  // @Input() showlinks: boolean=true;
  cartNumber!: number;
  constructor(private flowbiteService: FlowbiteServiceService, public _authService: AuthService, private cart: CartService, private _translate:MyTranslateService) {
  
    this.cart.cartNumber.subscribe({
      next: (res)=>{
        this.cartNumber = res;
        console.log(this.cartNumber);
        
      }
    })
}


  ngOnInit(): void {
    this.flowbiteService.loadFlowbite(flowbite => {
      // Your custom code here
      console.log('Flowbite loaded', flowbite);
      this._authService.userData.subscribe({
        next:(res)=> {
          if (res !== null) {
            this.isLogin = true;
          } else {
            this.isLogin = false;
          }
        }
      })
    
    });
  }
  changeLang(lang:string) {
    localStorage.setItem("savedLang", lang);
    this._translate.ChangeDiretion();
}

}
