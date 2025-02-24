import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, NgIf, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
errMassege: string = '';
  isLoading: boolean =false;
  AuthService: any;
  constructor(private _http: AuthService, private router:Router) { }
  //Controls formgroup to register form
 loginForm: FormGroup = new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email]),
   password: new FormControl(null, [Validators.required]),

  });

  submit() {
    this.isLoading = true;
    console.log("Touched",this.loginForm.get('name')?.touched);
    console.log("errors",this.loginForm.get('name')?.errors);
    console.log("errors", this.loginForm);
    if (this.loginForm.valid) {
       this._http.login(this.loginForm.value).subscribe({
      next: (res) => {
        if (res.message == "success") {
          this.isLoading = false;
          this.router.navigate(['/home'])
          //api =>token cart
          localStorage.setItem('UserToken', res.token);
          this._http.currentDecodedUser();
            }
            console.log(res);
            
          }, error: (err) => {
            this.errMassege = err.error.message;
            this.isLoading = true;
        console.log(`Your Error: `+err.error.message);
        
    }
  })
    }
   
}
}
