import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule,NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  errMassege: string = '';
  isLoading: boolean =false;
  constructor(private _http: AuthService, private router:Router) { }
  //Controls formgroup to register form
 registerForm: FormGroup = new FormGroup({
    name:new FormControl(null,[Validators.minLength(3),Validators.maxLength(9),Validators.required]),
    email:new FormControl(null,[Validators.required,Validators.email]),
    password: new FormControl(null, [Validators.required]),
    rePassword:new FormControl(null,[Validators.required]),
    phone:new FormControl(null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]),
 }, { validators: this.confirmPassword }
 );
  //custom validation password and repassword
  confirmPassword(group: AbstractControl) {
    const password = group.get('password')?.value;
    const rePassword = group.get('rePassword')?.value;
    if (password === rePassword) {
      return null;
    } else {
      return {mismatch:true}
    }
  }

  submit() {
    this.isLoading = true;
    console.log("Touched",this.registerForm.get('name')?.touched);
    console.log("errors",this.registerForm.get('name')?.errors);
    console.log("errors", this.registerForm);
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
    } else {
             this._http.register(this.registerForm.value).subscribe({
      next: (res) => {
        if (res.message == "success") {
              this.isLoading = false;
              this.router.navigate(['/login'])
            }
            console.log(res);
            
          }, error: (err) => {
            this.errMassege = err.error.message;
            this.isLoading = true;
        console.log('Your Error:' +err.error.message);
        
    }
  })
    }

    }
   
}