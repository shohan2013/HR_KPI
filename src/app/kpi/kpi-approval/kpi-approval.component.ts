import { Component, signal, ViewChild } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatTableDataSource } from '@angular/material/table';
import { KpiApprovalService } from '../../service/kpi-approval.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { EvolutionModalComponent } from '../evolution-modal/evolution-modal.component';
import { SnackbarService } from '../../service/snackbar/snackbar.service';


export interface KPITempItem {
  id:number,
  paramname: string;
  targettype:string;
  targetperiod:string;
  kpiid: number;
  kpidescription: string;
  department: string;
  narration: string;
  weight: number;
  descriptions:string;
  approvedate:string;
  docname: string;
  unit:string;
  name:string
}

export interface KPITempItemSummary {
  id:number,
  empname: string;
  designation:string;
  weight:string;
  department: number;
  financialyear: string;
}


@Component({
  selector: 'app-kpi-approval',
  templateUrl: './kpi-approval.component.html',
  styleUrl: './kpi-approval.component.css'
})


export class KpiApprovalComponent {
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  remark:string=""
  refresh:number=0;
  fyear:number=0;
  kpilistsummary:any;

  panelExpandedIndex: number | null = null;

  readonly panelOpenState = signal(false);
  
  //displayedColumnsSummary: string[] = ['name','department','unit','paramname','targettype', 'targetperiod','kpidescription','narration','weight','target','descriptions','approvedate','docname','action'];
  //dataSourceSummary:MatTableDataSource<KPITempItemSummary>;

  displayedColumns: string[] = ['unit','paramname','targettype', 'targetperiod','kpidescription','narration','weight','target','descriptions','approvedate','docname','action'];
  dataSource:MatTableDataSource<KPITempItem>;

   

  doclist: any;
  description:any;
  status:any;
  financialyearlist:any;

  
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;
  
  constructor(private service : KpiApprovalService,private snackbar:MatSnackBar,private snackbarservice : SnackbarService){ //Add it to constructor :private dialog:MatDialog,
    dataSource:MatTableDataSource<KPITempItem>;
    
    const kpi:KPITempItem[]=[];
    this.dataSource=new MatTableDataSource(kpi);

    this.GetDocStatus();
    this.GetFinancialYear();
  }

  
  GetFinancialYear()
  {
    this.service.GetFinancialYear().subscribe((data: any[])=>{
      this.financialyearlist = data;
    })  
  }


  check(e:any)
  {
      //console.log(e);
      this.GetKPIList(e);
  }


   GetKPIList(e:any)
  {
      this.service.KPIApprovallist(e.financialyear,e.id).subscribe((data: any[])=>{
      this.dataSource.data = [];
      this.dataSource=new MatTableDataSource <KPITempItem>(data);
      this.dataSource.paginator=this.paginator
      this.dataSource.sort=this.sort
    })  
  }


     GetKPIListIndividual(financialyear:string,enroll:number)
    {
      this.service.KPIApprovallist(financialyear,enroll).subscribe((data: any[])=>{
      this.dataSource.data = [];
      this.dataSource=new MatTableDataSource <KPITempItem>(data);
      this.dataSource.paginator=this.paginator
      this.dataSource.sort=this.sort
    })  
  }


  // GetKPIList(e:any)
  // {
  //     this.service.KPIApprovallist(this.fyear,this.status).subscribe((data: any[])=>{
  //     this.dataSource=new MatTableDataSource <KPITempItem>(data);
  //     this.dataSource.paginator=this.paginator
  //     this.dataSource.sort=this.sort
  //   })  
  // }


  GetKPIListSummary(e:any)
  {
      this.service.KPIApprovallistSummary(this.fyear,this.status).subscribe((data: any[])=>{
        this.kpilistsummary=data;
      //this.dataSource=new MatTableDataSource <KPITempItemSummary>(data);
      
    })  
  }


  GetDocStatus()
  {
    this.service.Doclist().subscribe((data: any[])=>{
      this.doclist = data;
    })  
  }


  FilterChange(data:Event)
  {
    const value=(data.target as HTMLInputElement).value;
    this.dataSource.filter=value;
  }


  Approve(financialyear:string,initiator:number,id:number,remark:string)
  {
    const lastIndex = this.panelExpandedIndex;
    this.service.Approve(id,remark).subscribe((res:any)=>{
      if(res.item2.includes("success"))
        {
 
          this.snackbarservice.success(res.item1, 'close', 3000);
          this.GetKPIListIndividual(financialyear,initiator);
          this.GetKPIListSummary(financialyear);
          //this.panelExpanded = true;
          this.panelExpandedIndex = lastIndex;
        }
        else
        {
          this.snackbarservice.error(res.item1, 'close', 3000);
        }
    })
  }



  Reject(financialyear:string,initiator:number,id:number,remark:string)
  {
    const lastIndex = this.panelExpandedIndex;
    this.service.Reject(id,remark).subscribe((res:any)=>{

      if(res.item2.includes("success"))
        {
          this.snackbarservice.success(res.item1, 'close', 3000);
          this.GetKPIListIndividual(financialyear,initiator);
          this.GetKPIListSummary(financialyear);
          //this.panelExpanded = true;
          this.panelExpandedIndex = lastIndex;
        }
        else
        {
          this.snackbarservice.error(res.item1, 'close', 3000);
        }
    })
  }

  Review(financialyear:string,initiator:number,id:number,remark:string)
  {
    const lastIndex = this.panelExpandedIndex;
    this.service.Review(id,remark).subscribe((res:any)=>{
      if(res.item2.includes("success"))
        {
          this.snackbarservice.success(res.item1, 'close', 3000);
          this.GetKPIListIndividual(financialyear,initiator);
          this.GetKPIListSummary(financialyear);
          //this.panelExpanded = true;
          this.panelExpandedIndex = lastIndex;
        }
        else
        {
          this.snackbarservice.error(res.item1, 'close', 3000);
        }
    })
  }

  // OpenEvolutionModal()
  // {
  //   this.dialog.open(EvolutionModalComponent,{
  //     maxWidth: '100vw',
  //     maxHeight: '100vh',
  //     height: '100%',
  //     width: '100%'
  //     //panelClass: 'full-screen-modal'
  //   });
  // }
}
