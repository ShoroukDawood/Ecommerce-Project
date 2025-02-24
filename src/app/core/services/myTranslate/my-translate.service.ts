import { Injectable } from '@angular/core';
import {TranslateService} from '@ngx-translate/core'
@Injectable({
  providedIn: 'root'
})
export class MyTranslateService {

  constructor(private _translate: TranslateService) {
    _translate.setDefaultLang('en');
    this.ChangeDiretion();
   }
  

  ChangeDiretion() {
    let savedLang = localStorage.getItem('savedLang')|| '';
    this._translate.use(savedLang);
    if (savedLang == "en") {
      document.documentElement.dir = "ltr";
    } else {
      document.documentElement.dir = "rtl";

    }
  }
}
