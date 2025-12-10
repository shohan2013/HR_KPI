import { Component, ViewChild } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { KpiApprovalService } from '../../service/kpi-approval.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from '../../service/snackbar/snackbar.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EvaloutionDialogComponent } from '../evaloution-dialog/evaloution-dialog.component';
import { Title } from '@angular/platform-browser';

export interface Evolution {
  id:number;
  enroll:number,
  empname: string;
  designation: string;
  financialyear: number;
  code:string;
  docstatus: string;
  complete:string;
  incomple: string;
  date: number,

  ratingid:number;
  supervisorrating: string;
  commentsid:number;
  comments: string;
  promotionid: number,
  increment:number,
  promotion:string;
  proposeddesignedid: number;
  proposeddesigned: string,
}


@Component({
  selector: 'app-evolution-modal',
  templateUrl: './evolution-modal.component.html',
  styleUrl: './evolution-modal.component.css'
})

export class EvolutionModalComponent {
  evolution !:Evolution[];
  dataSource:any;
  ratinglist:any;
  financialyearlist:any;
  ratingid:number=0;
  promotionid:number=0;
  proposeddesignationid:number=0;
  refresh:any;
  commentlist:any;
  comments:any;
  commentsid:any;
  promotionlist:any;
  proposedposition:any;
  textboxControl:any;
  submitted:boolean=true;
  doclist: any;
  fyear: any;
  status:any;

  displayedColumns: string[] = ['empname','designation','supervisorrating','comments','increment','promotion','proposedposition','complete','incomplete','financialyear','date','docstatus', 'action'];
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(private service : KpiApprovalService,private snackbar:MatSnackBar,private snackbarservice : SnackbarService,private dialog:MatDialog){ //Add it to constructor : private matref:MatDialogRef<EvolutionModalComponent>
    this.GetRating();
    //this.GetEvolutionData();
    this.GetPromotion();
    this.GetPropsedPosition();
    this.GetFinancialYear();
    this.GetDocStatus();
  }
 
  GetDocStatus()
  {
    this.service.Doclist().subscribe((data: any[])=>{
      this.doclist = data;
    })  
  }

  GetComments(e:any,element:any)
  {
    this.ratingid=e.value;
    this.service.GetComment(e.value).subscribe((data: any[])=>{
      element.comments = data[0].name;
      element.commentsid=data[0].id;
    })  
  }

  GetPromotionData(e:any)
  {
    this.promotionid=e.value;
  }

  GetProposedDesignation(e:any)
  {
    this.proposeddesignationid=e.value;
  }


  GetRating()
  {
    this.service.GetRating().subscribe((data: any[])=>{
      this.ratinglist = data;
    })  
  }

  GetFinancialYear()
  {
    this.service.GetFinancialYear().subscribe((data: any[])=>{
      this.financialyearlist = data;
    })  
  }

  LoadGridFinancialYear(e:any)
  {
    this.service.GetEvolutionDataByFinancialYear(this.fyear,this.status).subscribe((data: any[])=>{
      this.evolution=data;
      this.dataSource=new MatTableDataSource <Evolution>(this.evolution);
      this.dataSource.paginator=this.paginator
      this.dataSource.sort=this.sort
    })  
  }


  GetPromotion()
  {
    this.service.GetPromotion().subscribe((data: any[])=>{
      this.promotionlist = data;
    })  
  }

  GetPropsedPosition()
  {
    this.service.GetProposedPosition().subscribe((data: any[])=>{
      this.proposedposition = data;
    })  
  }

  GetEvolutionData()
  {
    this.service.GetEvolutionData().subscribe((data: any[])=>{
      this.evolution=data;
      this.dataSource=new MatTableDataSource <Evolution>(this.evolution);
      this.dataSource.paginator=this.paginator
      this.dataSource.sort=this.sort
    })  
  }

  numberOnly(event:any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  CheckRange(event:any): boolean
  {
    if(event.target.value > 100 || event.target.value < 0)
      {
        event.target.value=0;
        return false;
      }
      return true;
  }

  Approve(element:any)
  {
    if(element.ratingid==0)
    {
      this.snackbarservice.error('Please Select Supervisor Rating.', 'close', 3000);
    }
    else
    {
          this.service.EvolutionApprove(element).subscribe((res:any)=>{
            if(res.item2.includes("success"))
              {
                if(res.item2.includes("success"))
                  {
                    this.snackbarservice.success(res.item1, 'close', 3000);
                    //this.GetEvolutionData();
                    this.LoadGridFinancialYear(0);
                  }
                  else
                  {
                    this.snackbarservice.error(res.item1, 'close', 3000);
                  }
              }
          })
      // }
    }
      // if(this.submitted)
      // {
      //   element.ratingid=this.ratingid;
      //   element.proposeddesigid=this.proposeddesignationid;
      //   element.promotionid=this.promotionid;
      //   element.commentsid=this.commentsid;

      //     this.service.EvolutionApprove(element).subscribe((res:any)=>{
      //       if(res.item2.includes("success"))
      //         {
      //           if(res.item2.includes("success"))
      //             {
      //               this.snackbarservice.success(res.item1, 'close', 3000);
      //               this.GetEvolutionData();
      //             }
      //             else
      //             {
      //               this.snackbarservice.error(res.item1, 'close', 3000);
      //             }
      //         }
      //     })
      // }
    
  }

  Reject(id:any)
  {

    this.service.EvolutionReject(id,'').subscribe((res:any)=>{
          if(res.item2.includes("success"))
            {
              this.snackbarservice.success(res.item1, 'close', 3000);
              this.GetEvolutionData();
            }
            else
            {
              this.snackbarservice.error(res.item1, 'close', 3000);
              this.GetEvolutionData();
            }
    })
  }


  FilterChange(data:Event)
  {
    const value=(data.target as HTMLInputElement).value;
    this.dataSource.filter=value;
  }

  closeup()
  {
    //this.matref.close();
  }

  

  OpenDialog(element:any)
  {
    this.dialog.open(EvaloutionDialogComponent,{
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      data:{
        ID:element.id,
        FinancialYear:element.financialyear
      }
      //panelClass: 'full-screen-modal'
    });
  }
  

}
