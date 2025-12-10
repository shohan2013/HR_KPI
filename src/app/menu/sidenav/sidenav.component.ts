import { Component, computed, Input, signal } from '@angular/core';
import { ConnectionService } from '../../service/connection.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MenuService } from '../../service/menu/menu.service';

export type MenuItem={
  expanded:boolean;
  icon: string;
  isdropdown:boolean;
  label:string;
  menuID:number;
  routerLink:string
}


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})

export class SidenavComponent {
  lblName:any="";
  lblDepartment:any="";
  navData:any;

  sideNavCollapsed=signal(false);
  @Input() set collapsed(val: boolean)
  {
    this.sideNavCollapsed.set(val);
  }

  menu:MenuItem[]=[];


  constructor(private con:ConnectionService,private http:HttpClient,private router:Router,private service:MenuService) { 
    
  }

  ngOnInit():void
  {
    if(localStorage.getItem('token')!=null)
    {
      //this.getMenulist();
      //this.getSubmenulist();
      
      // this.imagepath=localStorage.getItem('Path');
      this.lblDepartment=localStorage.getItem('Department');
      this.lblName=localStorage.getItem('Name');
      //this.LoadGSubMenu(localStorage.getItem('Enroll'));
      //this.service.submitted=true;
      this.LoadGMenu(localStorage.getItem('Enroll'));
      //this.loginservice.submitted=true;
    }
    else
    {
      // this.loginservice.submitted=false;
      // this.router.navigate(['/login']);
    }
  }

  LoadGMenu(UserID:any)
  {
    this.service.getGMenu(UserID).subscribe((data: any[])=>{
      this.menu = data;
    })  
  }

  LoadGSubMenu(UserID:any)
  {
    this.service.getGSubMenu(UserID).subscribe(data=>{
      //this.subdata=data;
    })
  }
  

// menuItems = signal<MenuItem[]>([
//   {
//     icon : 'dashboard',
//     label : 'KPI Approval',
//     route : '#'
//   },
  
//   {
//     icon : 'video_library',
//     label : 'KPI',
//     route : '#',
//     subItems:[
//       {
//         icon : 'play_circle',
//         label : 'View KPI',
//         route : 'kpi-list'
//       },
//       {
//         icon : 'playlist_play',
//         label : 'KPI Entry',
//         route : 'kpi-save'
//       }
//     ]
//   },
//   {
//     icon : 'dashboard',
//     label : 'KPI Approval',
//     route : '#'
//   },
// ]); 

profilePicSize=computed(() => this.sideNavCollapsed() ? '32' : '100')
}
