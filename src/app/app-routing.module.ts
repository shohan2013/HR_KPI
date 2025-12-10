import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KpiListComponent } from './kpi/kpi-list/kpi-list.component';
import { KpiSaveComponent } from './kpi/kpi-save/kpi-save.component';
import { KpiEditComponent } from './kpi/kpi-edit/kpi-edit.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/auth/auth.guard';
import { KpiApprovalComponent } from './kpi/kpi-approval/kpi-approval.component';
import { EvolutionModalComponent } from './kpi/evolution-modal/evolution-modal.component';
import { MyEvaluationComponent } from './kpi/my-evaluation/my-evaluation/my-evaluation.component';
import { KpiReportComponent } from './report/kpi-report/kpi-report.component';
import { OTPComponent } from './otp/otp.component';

const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},
  { path: 'kpi-list', component: KpiListComponent,canActivate:[AuthGuard] },
  { path: 'kpi-save', component: KpiSaveComponent },
  { path: 'kpi-edit/:id/:periodcategoryid', component: KpiEditComponent },
  { path:'login', component:LoginComponent},
  { path: 'kpi-approval', component: KpiApprovalComponent },
  { path: 'evolution-modal',component:EvolutionModalComponent},
  { path: 'report',component:KpiReportComponent},
  { path: 'my-evaluation',component:MyEvaluationComponent},
  { path: 'otp',component:OTPComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
