import { Component, Inject } from '@angular/core';
import { KpiService } from '../../service/kpi.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SnackbarService } from '../../service/snackbar/snackbar.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { KpiListComponent } from '../kpi-list/kpi-list.component';

@Component({
  selector: 'app-kpi-edit',
  templateUrl: './kpi-edit.component.html',
  styleUrl: './kpi-edit.component.css'
})

export class KpiEditComponent {
  id:number=0;
  periodcategoryid:number=0;
  Parameters:number=0;
  submitted = false;
  paramlist:any;
  periodcategorylist:any;
  periodcategorydetailslist:any;

  Rweight:number=0;
  checkrange:number=0;
  previous:number=0;
  remaining:number=0;
  holdrem:number=0;
  tempweight:number=0;


  constructor(@Inject(MAT_DIALOG_DATA) public data:any,private service:KpiService,private route:Router,private router:ActivatedRoute,private snackbar:SnackbarService,private matref:MatDialogRef<KpiEditComponent>){}

  ngOnInit():void
  {

    //this.id=parseInt(this.router.snapshot.paramMap.get('id') || '{}');
    //this.periodcategoryid=parseInt(this.router.snapshot.paramMap.get('periodcategoryid') || '{}');

    this.GetKPIByID(this.data.ID);

    this.GetParamlist();
    this.GetPeriodCategory();
    this.GetPeriodCategoryDetails(this.data.FinancialYear);

    this.CheckPreviousWeight();
  }

  MasterForm: FormGroup=new FormGroup({
    ID:new FormControl('0'),
    ParametersID:new FormControl('0',Validators.required),
    KPIDescription:new FormControl('',Validators.required),
    TargetPeriodTypeID:new FormControl('0',Validators.required),
    TargetPeriodID:new FormControl('0',Validators.required),
    Narration:new FormControl(),
    Weight:new FormControl('0',Validators.required),
    Target:new FormControl('0',Validators.required)
  });
  
  GetParamlist()
  {
    this.service.GetCatagorylist().subscribe((data: any[])=>{
      this.paramlist = data;
    })  
  }

  numberOnly(event:any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  GetPeriodCategory()
  {
    this.service.GetPeriodCategory().subscribe((data: any[])=>{
      this.periodcategorylist = data;
    })  
  }

  GetPeriodCategoryDetails(e:any)
  {
    this.service.GetPeriodCategoryDetails(e.value).subscribe((data: any[])=>{
      this.periodcategorydetailslist = data;
    })  
  }

  GetPeriodCategoryDetailsEdit(targetperiodtypeid:any)
  {
    this.service.GetPeriodCategoryDetails(targetperiodtypeid).subscribe((data: any[])=>{
      this.periodcategorydetailslist = data;
    })  
  }

  GetKPIByID(id:number)
  {
   this.service.GetKPIlistByID(id).subscribe((data: any[])=>{
    this.MasterForm.controls['ID'].setValue(data[0].id);
    this.MasterForm.controls['ParametersID'].setValue(data[0].parameterid);
    this.MasterForm.controls['KPIDescription'].setValue(data[0].kpidescription);  
    this.MasterForm.controls['TargetPeriodTypeID'].setValue(data[0].targetperiodtypeid);
    this.GetPeriodCategoryDetailsEdit(data[0].targetperiodtypeid);
    this.MasterForm.controls['TargetPeriodID'].setValue(data[0].targetperiodid);
    this.MasterForm.controls['Narration'].setValue(data[0].narration);
   this.MasterForm.controls['Weight'].setValue(data[0].weight);
   this.MasterForm.controls['Target'].setValue(data[0].target);
   this.holdrem=data[0].weight;
   });
  }

  
  CheckWeight(e:any)
  {
    if(e.target.value > this.remaining+this.holdrem || this.remaining+this.holdrem > 100)
    {
      this.checkrange=0;
      //this.Rweight=this.remaining-e.target.value;
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

  Update() : void
  {
    this.submitted=true;

    if(this.MasterForm.value.ParametersID==0)
    {
      this.snackbar.error("Select Parameter", 'close', 3000);
      this.submitted=false;
    }
    if(this.MasterForm.value.TargetPeriodTypeID==0)
    {
      this.snackbar.error("Select Target Period Type", 'close', 3000);
      this.submitted=false;
    }
    if(this.MasterForm.value.TargetPeriodID==0)
      {
        this.snackbar.error("Select Target Period", 'close', 3000);
        this.submitted=false;
      }
    if(this.MasterForm.value.Narration=="")
    {
        this.snackbar.error("Enter Narration", 'close', 3000);
        this.submitted=false;
    }
    if(this.MasterForm.value.KPIDescription=="")
    {
        this.snackbar.error("Enter KPI", 'close', 3000);
        this.submitted=false;
    }
    if(this.MasterForm.value.Weight =="" || this.MasterForm.value.Weight==0)
    {
        this.snackbar.error("Weight Should Not be Greater Then Remaning or Zero.", 'close', 3000);
        this.submitted=false;
    }

    if(this.submitted)
    {
    this.service.Update(this.MasterForm.value.ID,this.MasterForm.value).subscribe((res: any)=>{
      if(res.item2.includes("success"))
        {
          this.snackbar.success(res.item1, 'close', 3000);
        }
        else
        {
          this.snackbar.error(res.item1, 'close', 3000);
        }
    }) ;
   
    this.matref.close(true);
  }
  }

  
  closeup()
  {
    this.matref.close();
  }
}
