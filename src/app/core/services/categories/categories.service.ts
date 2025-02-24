import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../../constant/baseUrl';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private _http: HttpClient) { }
  getCategories(): Observable<any>{
    return this._http.get(`${baseUrl.BaseUrl}/categories`);
  }

  getSpecificGategories(categoryId:string): Observable<any>{
    return this._http.get(`${baseUrl.BaseUrl}/categories/${categoryId}`)
  }
  getSubCategories(categoryId:string): Observable<any>{
    return this._http.get(`${baseUrl.BaseUrl}/categories/${categoryId}/subcategories`)
  }
}
