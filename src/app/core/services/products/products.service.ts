import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../../constant/baseUrl';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private _http: HttpClient) { }
  getProducts():Observable<any>{
   return this._http.get(`${baseUrl.BaseUrl}/products`);
    
  }
  getProductDetails(id:string):Observable<any>{
   return this._http.get(`${baseUrl.BaseUrl}/products/${id}`);
    
  }
}
