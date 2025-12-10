import { Component } from '@angular/core';
import { KpiService } from '../../service/kpi.service';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

import { SnackbarService } from '../../service/snackbar/snackbar.service';
import { MatDialogRef } from '@angular/material/dialog';
import { KpiListComponent } from '../kpi-list/kpi-list.component';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';


export interface KPITempItem {
  parametersid:number,
  parameters: string;
  kpidescription: string;
  targetperiodtypeid: number;
  targetperiodtype:string;
  targetperiodid: number;
  targetperiod:string;
  narration: string;
  weight: number;
  target: string;
  enroll :number
}

//const Temp_Data: KPITempItem[] = [];

@Component({
  selector: 'app-kpi-save',
  templateUrl: './kpi-save.component.html',
  styleUrl: './kpi-save.component.css'
})

export class KpiSaveComponent {
  
  displayedColumns: string[] = ['parameters', 'kpi', 'targetperiodtype','targetperiod','naration','weight','target','action'];
  
  //weightsum:any=0;

  Parameters:number=0;
  submitted = false;
  submittedadd=false;
  paramlist:any;
  periodcategorylist:any;
  periodcategorydetailslist:any;
  dataSource:MatTableDataSource<KPITempItem>;
  Rweight:number=0;
  checkrange:number=0;
  previous:number=0;
  remaining:number=0;
  window: any;

  
  ngOnInit() : void{
    this.GetParamlist();
    this.GetPeriodCategory();
    this.CheckPreviousWeight();
  }
  
  numberOnly(event:any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  constructor(private router:Router,private service : KpiService,private snackbar:SnackbarService,private matref:MatDialogRef<KpiSaveComponent>){
    const kpi:KPITempItem[]=[];
    this.dataSource=new MatTableDataSource(kpi);
    
  }

  GetParamlist()
  {
    this.service.GetCatagorylist().subscribe((data: any[])=>{
      this.paramlist = data;
    })  
  }

  GetPeriodCategory()
  {
    this.service.GetPeriodCategory().subscribe((data: any[])=>{
      this.periodcategorylist = data;
    })  
  }

  GetPeriodCategoryDetails(e:any)
  {
    //console.log(e.source.triggerValue);
    this.service.GetPeriodCategoryDetails(e.value).subscribe((data: any[])=>{
      this.periodcategorydetailslist = data;
    })  
  }
  
  MasterForm: FormGroup=new FormGroup({
    Parameters:new FormControl('0',Validators.required),
    KPI:new FormControl('',Validators.required),
    TargetPeriodTypeID:new FormControl('0',Validators.required),
    TargetPeriodID:new FormControl('0',Validators.required),
    Target:new FormControl(''),
    Narration:new FormControl('',Validators.required),
    Weight:new FormControl('',[Validators.required,Validators.min(0),Validators.max(100)]),
  });


  Add(parameterid:any,kpi:any,targetperiodtypeid:any,targetperiod : any,narration : any,weight : any,target:string)
  {
    this.submittedadd=true;
      if(parameterid==0)
      {
        this.snackbar.error("Select Parameter", 'close', 3000);
        this.submittedadd=false;
      }
      if(kpi=="")
      {
          this.snackbar.error("Enter KPI", 'close', 3000);
          this.submittedadd=false;
      }
     if(targetperiodtypeid==0)
      {
        this.snackbar.error("Select Target Period Type", 'close', 3000);
        this.submittedadd=false;
      }

     if(targetperiod==0)
      {
        this.snackbar.error("Select Target Period", 'close', 3000);
        this.submittedadd=false;
      }
      if(weight=="" || weight==0)
        {
          this.snackbar.error("Weight Should Not be Greater Then Remaning or Zero.", 'close', 3000);
          this.submittedadd=false;
        }
        
      if(narration=="")
        {
          this.snackbar.error("Enter Narration", 'close', 3000);
          this.submittedadd=false;
        }

     
      if(this.submittedadd)
      {
        
        const vparamname=this.paramlist.find((i: { id: number; }) => i.id===parameterid);    //take dropdownlist text from paramlist using id.
        const vtargetperiodtype=this.periodcategorylist.find((i: { id: number; }) => i.id===targetperiodtypeid);
        const vtargetperiod=this.periodcategorydetailslist.find((i: { id: number; }) => i.id===targetperiod);
        
        this.dataSource.data.push({
          parametersid:parameterid,
          parameters: vparamname.name,
          kpidescription: kpi,
          targetperiodtypeid: targetperiodtypeid,
          targetperiodtype:vtargetperiodtype.name,
          targetperiodid: targetperiod,
          targetperiod:vtargetperiod.name,
          narration: narration,
          weight: weight,
          target: target,
          enroll:parseInt(localStorage.getItem("Enroll") || '{}')
        });

        let weightsum:number=0;
        let lastindex=0;

         this.dataSource.data.forEach((element,index) => {
          lastindex=index;
          weightsum=Number(weightsum)+Number(element.weight);
         });

       
         if(weightsum > this.remaining)
         {
          this.snackbar.error("Weight Couldn't Be Greater Than Remaining", 'close', 3000);
          this.dataSource.data.splice(lastindex,1);
          this.dataSource.filter="";
         }
      }
      
      this.dataSource.filter="";
  }

  get f(): { [key: string]: AbstractControl } {
    return this.MasterForm.controls;
  }
  
  Remove(index:any)
  {
    this.dataSource.data.splice(index,1);
    this.dataSource.filter="";
  }


  CheckWeight(e:any)
  {
    if(this.remaining>=e.target.value)
    {
      this.Rweight=this.remaining-e.target.value;
    }
    else
    {
      this.Rweight=this.remaining;
      this.checkrange=0;
    }
  }
  

  CheckPreviousWeight()
  {
    this.service.CheckWeight(0).subscribe((res:any)=>{
      if(res==0)
      {
        this.previous=0;
        this.remaining=100-res;
      }
      else
      {
        this.previous=res;
        this.remaining=100-res;
      }
    })
  }


  Save() : void
  {
    if(this.dataSource.data.length>0)
    {
      this.service.Save(this.dataSource.data).subscribe((res:any)=>{
        if(res.item2.includes("success"))
        {
          this.snackbar.success(res.item1, 'close', 3000);
          this.dataSource.data=[];
          this.MasterForm.reset();
          this.matref.close(true);
        }
      }
    )}
    else
    {
      this.snackbar.error("First Add Item Then Save.", 'close', 3000);
    }
  
    
  }
  
  closeup() : void
  {
    this.matref.close(true);
  }
}
