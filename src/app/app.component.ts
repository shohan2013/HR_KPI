import { Component, computed, signal } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './service/login/login.service';
import { MenuService } from './service/menu/menu.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  collapsed=signal(false);
  sidenavWidth=computed(() => this.collapsed() ? '130px' : '250px')
  navData:any;
  constructor(private router:Router,public loginservice:LoginService,private service:MenuService){}
  ngOnInit():void
  {
    if(localStorage.getItem('token')!=null)
    {
      //this.getMenulist();
      //this.getSubmenulist();
      
      // this.imagepath=localStorage.getItem('Path');
      // this.username="Welcome: "+localStorage.getItem('Name');
      // this.submitted=true;
      this.loginservice.submitted=true;
      this.LoadGMenu(localStorage.getItem('UserID'));
    }
    else
    {
      this.loginservice.submitted=false;
      this.router.navigate(['/login']);
    }
  }

  LoadGMenu(UserID:any)
  {
    this.service.getGMenu(UserID).subscribe((data: any[])=>{
      this.navData = data;
    })  
  }

  Logout()
  {
    localStorage.setItem('Enroll','');
   
    this.router.navigate(['/login']);
  }

}
