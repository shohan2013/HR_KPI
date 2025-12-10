import { AfterViewInit, Component, Inject, inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { KpiApprovalService } from '../../service/kpi-approval.service';
import { MatTableDataSource } from '@angular/material/table';
import { Evolution } from '../evolution-modal/evolution-modal.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-evaloution-dialog',
  templateUrl: './evaloution-dialog.component.html',
  styleUrl: './evaloution-dialog.component.css'
})

export class EvaloutionDialogComponent implements OnInit {
  evolution !:Evolution[];
  status !:ApproverStatus[];
  inputdata:any;
  dataSource:any;
  statusSource:any;
  doclist: any;

  
  displayedColumns: string[] = ['parameters', 'kpi', 'targetperiodtype','targetperiod','naration','weight','target','financialyear','kpidate','achivement','activitydetails','docstatus'];
  approverStatusColumns: string[] = ['sl','initiator', 'approver', 'actiondate','status'];
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  
  constructor(@Inject(MAT_DIALOG_DATA) public data:any,private service:KpiApprovalService,private matref:MatDialogRef<EvaloutionDialogComponent>){}


 ngOnInit(): void {
   this.GetDataByEnrollSupervisorView(this.data.ID,this.data.FinancialYear);
   this.GetApproverStatus(this.data.ID);
 }

 GetDataByEnrollSupervisorView(enroll:number,fyear:string)
 {
  this.service.GetDataByEnrollSupervisorView(enroll,fyear).subscribe((data: any[])=>{
    this.evolution=data;
    this.dataSource=new MatTableDataSource <Evolution>(this.evolution);
    this.dataSource.paginator=this.paginator
    this.dataSource.sort=this.sort
  })  
 }


 GetApproverStatus(id:number)
 {
  this.service.GetApproverStatus(id).subscribe((data: any[])=>{
    this.status=data;
    this.statusSource=new MatTableDataSource <ApproverStatus>(this.status);

  })  
 }


 closeup()
 {
   this.matref.close();
 }

}


export interface ApproverStatus {
  id:number;
  initiator:number,
  actiontaker: string;
  actiondate: Date;
  status: string;
  description: string;
}