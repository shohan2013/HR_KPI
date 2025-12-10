import { Component, input, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
// import { MenuItem } from '../../sidenav/sidenav.component';
import { animate, style, transition, trigger } from '@angular/animations';
import { MenuService } from '../../../service/menu/menu.service';
import { MenuItem } from '../../sidenav/sidenav.component';


export type SubMenuItem={
  menuID:number;
  SubMenuID:number;
  subrouterLink:string;
  subLabel:string;
  Subitems:string;
  expanded:string;
}


@Component({
  selector: 'app-submenu',
  animations:[
    trigger('expandContractMenu',[
      transition(':enter',[
        
        style({opacity : 0, height:'0px'}),
        animate('500ms ease-in-out',style({opacity:1,height:'*'}))
      ]),
      transition(':leave',[
        animate('500ms ease-in-out',style({opacity:0,height:'0px'}))
      ])
    ])
  ],
  template: `

  <a mat-list-item 
  class="menu-item"
  [routerLink]=item().routerLink
  style="border-radius: unset;font-size: 8px;font-family: 'Montserrat';" 
  (click)="toggledNested()"
  routerLinkActive="selected-menu-item" 
  #rla="routerLinkActive" 
  [activated]="rla.isActive"
  >

            <mat-icon matListItemIcon>{{item().icon}}</mat-icon>
            @if (!collapsed()) {
              <span matListItemTitle>{{item().label}}</span>
            }
            @if(item().isdropdown)
            {
                <span matListItemMeta>
                  @if(nestedMenuOpen()){
                    <mat-icon style="color:black" class="sidenav-header">expand_less</mat-icon>
                  }@else{
                    <mat-icon style="color:black">expand_more</mat-icon>
                  }
                  
                </span>
            }
            </a>
  
           @if(item().isdropdown && nestedMenuOpen()){
            <div @expandContractMenu>
              @for(subItem of submenudata; track subItem.SubMenuID){
                @if(item().menuID==subItem.menuID)
                {
                <a mat-list-item 
                class="menu-item"
                [class.indented]="!collapsed()"
                style="border-radius: unset;font-size: 8px;font-family: 'Montserrat';" 
                [routerLink]="subItem.subrouterLink"
                routerLinkActive
                #rla="routerLinkActive" 
                [activated]="rla.isActive"
                >
                  @if (!collapsed()) {
                    <span matListItemTitle>{{subItem.subLabel}}</span>
                  }
                </a>
                }
              }
            </div>
           } 
  `,
  styles: `
  :host * 
    {
      transition: all 500ms ease-in-out;
    }

      .menu-item
      {
        border-left: 5px solid;
        border-left-color: var(--primary-color);
        font-family: 'Montserrat';
      }

      .selected-menu-item
      {
          border-left: 5px solid;
          border-left-color:  hsl(226, 63%, 80%);
          color: hsl(226, 63%, 80%);
          font-size: 10px;
          font-family: 'Montserrat'
      }

      .indented{
        --mat-list-list-item-leading-icon-start-space:48px;
      }

      .mdc-list-item__primary-text{
          font-size:11px;
          font-weight:bold;
         font-family: 'Montserrat'
      }

      mat-toolbar{
        position:relative;
        z-index:5;
      }
      .content{
        padding:20px;
      }

    

   
  `,
  standalone:true,
  imports:[MatListModule,RouterModule,MatIcon],
})
export class SubmenuComponent {
item=input.required<MenuItem>();
collapsed=input(false);
nestedMenuOpen=signal(false);
toggledNested()
{
  if(!this.item().isdropdown){
    return;
  }
  this.nestedMenuOpen.set(!this.nestedMenuOpen());
}


submenudata:SubMenuItem[]=[];

constructor(private service:MenuService) { }

ngOnInit(): void {
  if(localStorage.getItem('token') !=null)
  {
   
    this.LoadGSubMenu(localStorage.getItem('Enroll'));
  }
}

LoadGSubMenu(UserID:any)
{
  this.service.getGSubMenu(UserID).subscribe(data=>{
    this.submenudata=data;
  })
}

}
