import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { KpiService } from '../../service/kpi.service';
import { Observable } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatSnackBar , MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { SnackbarService } from '../../service/snackbar/snackbar.service';
import { MatDialog } from '@angular/material/dialog';
import { KpiSaveComponent } from '../kpi-save/kpi-save.component';
import { KpiEditComponent } from '../kpi-edit/kpi-edit.component';
import { KpiApprovalService } from '../../service/kpi-approval.service';

export interface KPITempItem {
  id:number;
  parameterid:number,
  parametername: string;
  kpidescription: string;
  targetperiodtypeid: number;
  targetperiodtype:string;
  targetperiodid: number;
  targetperiod:string;
  narration: string;
  weight: number;
  target: string;
  enroll:number;
  superviser:string;
  kpidate:string;
  docstatusid:number;
  docstatus:string;
  financialyear:string;
  achivementpercent:number;
  activitydetails:string;
  flag:boolean;
  description:string;
}

@Component({
  selector: 'app-kpi-list',
  templateUrl: './kpi-list.component.html',
  styleUrl: './kpi-list.component.css'
})

export class KpiListComponent implements AfterViewInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  displayedColumns: string[] = ['parameters', 'kpi', 'targetperiodtype','targetperiod','naration','weight','target','superviser','supervisorreview','financialyear','kpidate','achivement','activitydetails','docstatus', 'action'];
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  Parameters:number=0;
  submitted = false;
  paramlist:any;
  periodcategorylist:any;
  periodcategorydetailslist:any;
  kpilist !:KPITempItem[];
  dataSource:any;
  inputValue:boolean=false;
  isIconDisabled: boolean = true;
  isIconEnabled:boolean = false;

  fyear:number=0;
  financialyearlist:any;
  
  constructor(public kpiappservice:KpiApprovalService, private service : KpiService,private router:Router, private snackbar:MatSnackBar,private snackbarservice : SnackbarService,private dialog:MatDialog){
    // const kpi:KPITempItem[]=[];
    // this.dataSource=new MatTableDataSource(kpi);

    this.GetKPIList(this.fyear);
    this.GetFinancialYear();
  }

  ngOnInit() {
    this.GetKPIList(this.fyear);
  }

  ngAfterViewInit() {
    this.GetKPIList(this.fyear);
  }

  GetKPIList(e:any)
  {
    this.kpilist=[];
    this.service.GetKPIlist().subscribe((data: any[])=>{
      this.kpilist=data;
      this.dataSource=new MatTableDataSource <KPITempItem>(this.kpilist);
      this.dataSource.paginator=this.paginator
      this.dataSource.sort=this.sort
    })  
  }

  
  GetFinancialYear()
  {
    this.kpilist=[];
    this.kpiappservice.GetFinancialYear().subscribe((data: any[])=>{
      this.financialyearlist = data;
      this.dataSource=new MatTableDataSource <KPITempItem>(this.kpilist);
      this.dataSource.paginator=this.paginator
      this.dataSource.sort=this.sort
    })  
  }

  GetKPIListByYear(e:any)
  {
    this.service.GetKPIlistFYear(this.fyear).subscribe((data: any[])=>{
      this.kpilist=[];
      this.kpilist=data;
      this.dataSource=new MatTableDataSource <KPITempItem>(this.kpilist);
      this.dataSource.paginator=this.paginator
      this.dataSource.sort=this.sort
    })  
  }


  Edit(id:any,periodcategoryid:any)
  {
   const dialogRef= this.dialog.open(KpiEditComponent,{
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      data:{
        ID:id,
        FinancialYear:periodcategoryid
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result)
      {
        this.GetKPIList(this.fyear);
      }
     });
    //this.router.navigate(['/kpi-edit',id]);
    //this.router.navigate(['/kpi-edit',id,periodcategoryid]);
  }

  Update(element:any)
  {
    this.service.UpdateList(element).subscribe((res: any)=>{
      if(res.item2.includes("success"))
      {
        this.snackbarservice.success(res.item1, 'close', 3000);
        this.GetKPIList(this.fyear);
      }
      else
      {
        this.snackbarservice.error(res.item1, 'close', 3000);
      }
      
    });
  }

  Delete(id:any)
  {
    this.service.Delete(id).subscribe((res: any[])=>{
      this.snackbarservice.error('Data Deleted Successfully', 'close', 3000);
      this.GetKPIList(this.fyear);
    });
  }

  SendForEvolution()
  {
    this.service.SendForEvolution().subscribe((res: any)=>{
      if(res.item2.includes("success"))
      {
        this.snackbarservice.success(res.item1, 'close', 3000);
      }
      else
      {
        this.snackbarservice.error(res.item1, 'close', 3000);
      }
    });
  }

  numberOnly(event:any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  
  FilterChange(data:Event)
  {
    const value=(data.target as HTMLInputElement).value;
    this.dataSource.filter=value;
  }

  OpenDialog()
  {
    const dialogRef = this.dialog.open(KpiSaveComponent,{
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%'
    });

 dialogRef.afterClosed().subscribe(result => {
  if(result)
  {
    this.GetKPIList(this.fyear);
  }
  });
  }

}
