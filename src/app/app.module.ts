import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatToolbarModule} from '@angular/material/toolbar'
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { SidenavComponent } from './menu/sidenav/sidenav.component';
import { KpiListComponent } from './kpi/kpi-list/kpi-list.component';
import { KpiSaveComponent } from './kpi/kpi-save/kpi-save.component';
import { KpiEditComponent } from './kpi/kpi-edit/kpi-edit.component';
import { FlexLayoutModule } from "@angular/flex-layout";
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatTableModule} from '@angular/material/table';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar'; 
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatGridListModule} from '@angular/material/grid-list';
import { LoginComponent } from './auth/login/login.component';
import { SubmenuComponent } from './menu/submenu/submenu/submenu.component'; 
import {MatCheckboxModule} from '@angular/material/checkbox';
import { KpiApprovalComponent } from './kpi/kpi-approval/kpi-approval.component';
import { EvolutionModalComponent } from './kpi/evolution-modal/evolution-modal.component';
// import {MatBadgeModule} from '@angular/material/badge';
import {MatDialogModule} from '@angular/material/dialog';
import { EvaloutionDialogComponent } from './kpi/evaloution-dialog/evaloution-dialog.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MyEvaluationComponent } from './kpi/my-evaluation/my-evaluation/my-evaluation.component';
import { LinebreaksPipe } from './kpi/linebreaks.pipe';
import { KpiReportComponent } from './report/kpi-report/kpi-report.component';
import { authinterceptorInterceptor } from './auth/interceptor/authinterceptor.interceptor';
import { OTPComponent } from './otp/otp.component';
import { MatAccordion, MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle, MatExpansionPanelDescription } from "@angular/material/expansion";

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    KpiListComponent,
    KpiSaveComponent,
    KpiEditComponent,
    LoginComponent,
    KpiApprovalComponent,
    EvolutionModalComponent,
    EvaloutionDialogComponent,
    MyEvaluationComponent,
    LinebreaksPipe,
    KpiReportComponent,
    OTPComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatSidenavModule,
    MatListModule,
    FlexLayoutModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    MatDividerModule,
    MatTableModule,
    MatPaginatorModule,
    MatGridListModule,
    // SubmenuComponent,
    MatCheckboxModule,
    SubmenuComponent,
    MatDialogModule,
    MatProgressBarModule,
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    MatExpansionPanelDescription
],
  providers: [
    // {
    //   provide:HTTP_INTERCEPTORS,
    //   useClass:authinterceptorInterceptor,
    //   multi:true
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
