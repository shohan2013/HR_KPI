import { Component } from '@angular/core';
import { CommonService } from '../../service/common.service';
import { FormControl, FormGroup } from '@angular/forms';
import { KpiApprovalService } from '../../service/kpi-approval.service';
import { SnackbarService } from '../../service/snackbar/snackbar.service';

@Component({
  selector: 'app-kpi-report',
  templateUrl: './kpi-report.component.html',
  styleUrl: './kpi-report.component.css'
})
export class KpiReportComponent {

  unitlist: any;
  financialyearlist:any;
  unitid:number=0;
  fyearid:number=0;

  constructor(private cs: CommonService,private service : KpiApprovalService,private snackbar:SnackbarService)
  {
    
  }

  ngOnInit() {
        this.GetUnit(); 
        this.GetFinancialYear();
      }

   GetUnit()
    {
      this.cs.GetUnitlist().subscribe((data: any[])=>{
        this.unitlist = data;
      })  
    }
  
  
  GetFinancialYear()
  {
    this.service.GetFinancialYear().subscribe((data: any[])=>{
      this.financialyearlist = data;
    })  
  }


    Report(unitid:number=0,fyearid:string)
    {

      if(typeof fyearid=="undefined")
      {
        this.snackbar.error("Select Financial Year", 'close', 3000);
      }
      else
      {
        const motherUrl = 'https://report.akijbashir.com/ReportServer/Pages/ReportViewer.aspx?';
                              const folderUrl = '/TeaLink/KPILISTREPORT';
                              const otherUrl = '&rs:Embed=true&rc:LinkTarget=_self';

                              const unit = unitid;
                              const fyear = fyearid;
                              // const bookid = this.MasterForm.value.BOOKID||0;

                              const punit = "&UNITID=" + unit;
                              const pfyear = "&FINANCIALYEAR=" + fyear;
                              // const bookidurt = "&BOOKID=" + bookid;

                              const fullUrl = `${motherUrl}${encodeURIComponent(folderUrl)}${punit}${pfyear}${otherUrl}`;
                         
                              const newwindow = window.open(fullUrl, "_blank", "scrollbars=yes,toolbar=0,height=400,width=800,top=70,left=50");
                              if (newwindow && newwindow.focus) {
                                newwindow.focus();
      }
      
    }
  }
}
