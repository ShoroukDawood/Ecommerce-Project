import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../../constant/baseUrl';
import { Allorders, User } from '../../../shared/interface/allorders';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
userid!: Allorders;
token: any;
  constructor(private http: HttpClient) { }

  getAllOrders(): Observable<any>{
    return this.http.get(`${baseUrl.BaseUrl}/orders/`)
  }
  getUserOrders(userid:string): Observable<any>{
    return this.http.get(`${baseUrl.BaseUrl}/orders/user/${userid}`)    
  }
}
