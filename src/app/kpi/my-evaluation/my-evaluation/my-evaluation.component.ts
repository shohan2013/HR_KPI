import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { KpiApprovalService } from '../../../service/kpi-approval.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarService } from '../../../service/snackbar/snackbar.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { EvaloutionDialogComponent } from '../../evaloution-dialog/evaloution-dialog.component';

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
  selector: 'app-my-evaluation',
  templateUrl: './my-evaluation.component.html',
  styleUrl: './my-evaluation.component.css'
})
export class MyEvaluationComponent {

  evolution !:Evolution[];
  dataSource:any;
  ratinglist:any;
  financialyearlist:any;
  ratingid:number=0;
  promotionid:number=0;
  proposeddesignationid:number=0;
  refresh:any;
  fyear:any;
  commentlist:any;
  comments:any;
  commentsid:any;
  promotionlist:any;
  proposedposition:any;
  textboxControl:any;
  submitted:boolean=true;
  doclist: any;

  displayedColumns: string[] = ['empname','designation','supervisorrating','comments','increment','promotion','proposedposition','complete','incomplete','financialyear','date','docstatus','action'];
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;
  

  constructor(private service : KpiApprovalService,private snackbar:MatSnackBar,private snackbarservice : SnackbarService,private dialog:MatDialog){ //Add it to constructor : private matref:MatDialogRef<EvolutionModalComponent>
    //this.GetEvolutionData();
    this.GetFinancialYear();
    this.GetDocStatus();
  }

  GetDocStatus()
  {
    this.service.Doclist().subscribe((data: any[])=>{
      this.doclist = data;
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
    this.service.GetMyEvolutionByFYear(this.refresh,this.fyear).subscribe((data: any[])=>{
      this.evolution=data;
      this.dataSource=new MatTableDataSource <Evolution>(this.evolution);
      this.dataSource.paginator=this.paginator
      this.dataSource.sort=this.sort
    })  
  }

  // GetEvolutionData()
  // {
  //   this.service.GetMyEvolutionData().subscribe((data: any[])=>{
  //     this.evolution=data;
  //     this.dataSource=new MatTableDataSource <Evolution>(this.evolution);
  //     this.dataSource.paginator=this.paginator
  //     this.dataSource.sort=this.sort
  //   })  
  // }


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
  
  
  FilterChange(data:Event)
  {
    const value=(data.target as HTMLInputElement).value;
    this.dataSource.filter=value;
  }
  
}
