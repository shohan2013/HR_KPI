import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from '../../service/login/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  usertypelist=[{usertypeid:2,usertype:"ERP User"},{usertypeid:4,usertype:"Remote User"}]
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  copyright:string='©'+' and developed by AkijBashir Group IT Team.';
  // loading:boolean=false;

  submitted = false;
  loading=false;
  constructor(public loginservice:LoginService,private router:Router,private snackbar:MatSnackBar) { }

  loginform:FormGroup=new FormGroup({
    UserID:new FormControl('',[Validators.required]),
    Emppass:new FormControl('',Validators.required),
    UserTypeID:new FormControl('',Validators.required)
  });

  
  ngOnInit():void
  {
      this.loginservice.loading=false;
      localStorage.clear();
      this.loginservice.submitted=false;
  }

  get f(): { [key: string]: AbstractControl } {
    return this.loginform.controls;
  }
  
  onSubmit()
  {

    this.submitted = true;
    if(this.loginform.valid)
      this.loginservice.Login(this.loginform.value)
      this.loading=this.loginservice.loading;
  }

  GoToFB(url: string)
  {
    window.open(url, "_blank");
  }

  GoToMail(url: string)
  {
    window.open(url, "_blank");
  }

  GoToLinkedin(url: string)
  {
    window.open(url, "_blank");
  }
}
