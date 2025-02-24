import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Auth } from './../../shared/interface/auth';
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from './../../../../node_modules/jwt-decode/build/cjs/index.d';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { baseUrl } from '../../core/constant/baseUrl';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  getUserId(): string | null {
    throw new Error('Method not implemented.');
  }

  //user data make it login or not 
  userData: BehaviorSubject<null | JwtPayload> = new BehaviorSubject<null | JwtPayload>(null);

  constructor(private _http: HttpClient, @Inject(PLATFORM_ID) Id: object, private router: Router) {
    
  if(isPlatformBrowser(Id)) {
    if (localStorage.getItem('UserToken') !== null) {
      this.currentDecodedUser();
  }
  }

  
  }
  register(formData:Auth):Observable<any> {
    return this._http.post(`${baseUrl.BaseUrl}/auth/signup`,formData)
  }
  login(formData:Auth):Observable<any> {
        return this._http.post(`${baseUrl.BaseUrl}/auth/signin`,formData)

  }
  currentDecodedUser() {
    const token = localStorage.getItem('UserToken')!;
    const decoded = jwtDecode(token); //data
    this.userData.next(decoded);
    console.log('userdata:',this.userData );
    
  }
  logOut() {
    //remove token
    //userdata =>null
    //navigate to login
    localStorage.removeItem('userToken');
    this.userData.next(null);
    this.router.navigate(['/login'])
  }

}