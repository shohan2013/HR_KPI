import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { LoginService } from '../service/login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.css'
})
export class OTPComponent {

    usertypelist=[{usertypeid:2,usertype:"ERP User"},{usertypeid:4,usertype:"Remote User"}]
    horizontalPosition: MatSnackBarHorizontalPosition = 'start';
    verticalPosition: MatSnackBarVerticalPosition = 'bottom';
    copyright:string='©'+' and developed by AkijBashir Group IT Team.';
    // loading:boolean=false;
  
    submitted = false;
    loading=false;
    constructor(public loginservice:LoginService,private router:Router,private snackbar:MatSnackBar) { }
  
    loginform:FormGroup=new FormGroup({
      Emppass:new FormControl('',Validators.required),
    });
  
     get f(): { [key: string]: AbstractControl } {
        return this.loginform.controls;
      }
      
  onSubmit()
  {
    this.submitted = true;
    if(this.loginform.valid)
      this.loginservice.OTP(this.loginform.value)
      this.loading=this.loginservice.loading;
  }
}
