import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModelModule } from './service/service.module';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/material.module';
import { UpdatepopupComponent } from './updatepopup/updatepopup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { DisplayComponent } from './display/display.component';
import { FilterPipe } from './customPipe/catagoryPipe';
import { NotificationPopupComponent } from './notification-popup/notification-popup.component';
import { LeaveRequstComponent } from './leave-requst/leave-requst.component';
import { PayrollComponent } from './payroll/payroll.component';
import { SalaryFormComponent } from './salary-form/salary-form.component';
import { PayslipComponent } from './payslip/payslip.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    UpdatepopupComponent,
    DashboardComponent,
    ProfileComponent,
    DisplayComponent,
    FilterPipe,
    NotificationPopupComponent,
    LeaveRequstComponent,
    PayrollComponent,
    SalaryFormComponent,
    PayslipComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ModelModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
