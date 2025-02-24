import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../../constant/baseUrl';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  constructor(private _http: HttpClient) { }
  getAllBrands(): Observable<any>{
    return this._http.get(`${baseUrl.BaseUrl}/brands`)
  }
  getspecificBrands(brandId:string): Observable<any>{
    return this._http.get(`${baseUrl.BaseUrl}/brands/${brandId}`)
  }
}
