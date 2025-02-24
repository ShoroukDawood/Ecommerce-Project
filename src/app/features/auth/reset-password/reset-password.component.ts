import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ResetPasswordService } from '../../resetPassword/reset-password.service';
import { ToastrService } from 'ngx-toastr';
  import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule, NgIf],
templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {
  isLoading: boolean = false;
  steps: number = 1;

constructor(private _resetPassword:ResetPasswordService, private _Toastr:ToastrService, private auth:AuthService, private _router:Router){}
 resetPassword: FormGroup = new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email]),
    newPassword:new FormControl(null,[Validators.required ]),
    
  });
  verifyCode: FormGroup = new FormGroup({
    resetCode:new FormControl(null,[Validators.required ]),
    
  });
  forgetPassword: FormGroup = new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email]),

 });
  submitemail() {
    this._resetPassword.verfiyEmail(this.forgetPassword.value).subscribe({
      next: (res) => {
        console.log(res);
        if (res.statusMsg == "success") {
          this.steps = 2;
          this._Toastr.success(res.message, res.statusMsg);
        } else {
          console.log("Error");
          
        }
      }
    })
  }
  submitCode() {
    this._resetPassword.verifyResetCode(this.verifyCode.value).subscribe({
      next: (res) => {
        console.log(res);
        if (res.status == "Success") {
          this.steps = 3;
          this._Toastr.success(res.status);
        } else {
          console.log("Error");
          
        }
      }
    })
  }
  submitPassword() {
        this._resetPassword.ResetPassword(this.resetPassword.value).subscribe({
      next: (res) => {
            console.log(res);
            if (res.token) {
              localStorage.setItem('userToken', res.token);
              this.auth.currentDecodedUser;
              this._router.navigate(['/login'])
           }
      }
    })
  }
}
