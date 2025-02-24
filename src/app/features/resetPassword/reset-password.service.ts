import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from '../../core/constant/baseUrl';
import { Auth } from '../../shared/interface/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  constructor(private _http: HttpClient) { }
  verfiyEmail(payload:Auth):Observable<any> {
    return this._http.post(`${baseUrl.BaseUrl}/auth/forgotPasswords`, payload);
  }
  verifyResetCode(payload:Auth):Observable<any> {
    return this._http.post(`${baseUrl.BaseUrl}/auth/verifyResetCode`, payload);
  }
  ResetPassword(payload:Auth):Observable<any> {
    return this._http.put(`${baseUrl.BaseUrl}/auth/resetPassword`, payload);
  }
}
