import { Injectable } from '@angular/core';
import { ConnectionService } from '../connection.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { SnackbarService } from '../snackbar/snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  
  controller="/Login";
  controllerOTP="/OTP";
  submitted = false;
  loading = false;
 

  constructor(private con:ConnectionService,private http:HttpClient,private snackbar:SnackbarService,private router:Router) { }


  Login(user:any)
  {
    console.log(user);
    this.loading=true;
    this.http.post<any>(this.con.apiurl+this.controller,user).subscribe((res:any)=>{

          if(res==404)
          {
            this.snackbar.error("Invalid User Name Password.", 'close', 3000);
            this.submitted=false;
            this.loading=false;
            this.router.navigate(['/login']);
          }
          else if(res.usertypeid==4)
          {
            //console.log(res);
            // localStorage.setItem('token',res.token);
            // localStorage.setItem('list',JSON.stringify(res.query));
            // localStorage.setItem('Department',res.query[0].strDepatrment);
            // localStorage.setItem('Name',res.query[0].name);
            // localStorage.setItem('Enroll',res.query[0].enroll);
            // this.submitted=true;
            // this.loading=false;
            localStorage.setItem('stremail',res.userid);
            this.router.navigate(['/otp']);
          }
          else
          {
            localStorage.setItem('token',res.token);
            localStorage.setItem('list',JSON.stringify(res.query));
            localStorage.setItem('Department',res.query[0].strDepatrment);
            localStorage.setItem('Name',res.query[0].name);
            localStorage.setItem('Enroll',res.query[0].enroll);
            this.submitted=true;
            this.loading=false;
            this.router.navigate(['/kpi-list']);
          }
          // console.log(res);
    });
  }

 OTP(user:any)
  {
      user={
        UserID:localStorage.getItem("stremail"),
        Emppass:user.Emppass,
        UserTypeID:5
      }

    this.loading=true;
    this.http.post<any>(this.con.apiurl+this.controllerOTP,user).subscribe((res:any)=>{
          if(res==404)
          {
            this.snackbar.error("Incorrect OTP.", 'close', 3000);
            this.submitted=false;
            this.loading=false;
            this.router.navigate(['/login']);
          }
          else
          {
            localStorage.setItem('token',res.token);
            localStorage.setItem('list',JSON.stringify(res.query));
            localStorage.setItem('Department',res.query[0].strDepatrment);
            localStorage.setItem('Name',res.query[0].name);
            localStorage.setItem('Enroll',res.query[0].enroll);
            this.submitted=true;
            this.loading=false;
            this.router.navigate(['/kpi-list']);

          }
         
    });
  }
}
