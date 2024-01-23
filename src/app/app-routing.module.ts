import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/routing.guard';
import { ProfileComponent } from './profile/profile.component';
import { DisplayComponent } from './display/display.component';
import { LeadingComment } from '@angular/compiler';
import { LeaveRequstComponent } from './leave-requst/leave-requst.component';
import { PayrollComponent } from './payroll/payroll.component';
import { SalaryFormComponent } from './salary-form/salary-form.component';
import { PayslipComponent } from './payslip/payslip.component';

const routes: Routes = [
  { path: "", component: DisplayComponent, canActivate: [AuthGuard] },
  { path: "display", component: DisplayComponent, canActivate: [AuthGuard] },
  { path: "home", component: HomeComponent, canActivate: [AuthGuard] },
  { path: "form/add", component: RegisterComponent },
  { path: "form/:mode/:id", component: RegisterComponent, canActivate: [AuthGuard] },
  { path: "profile/:id", component: ProfileComponent, canActivate: [AuthGuard] },
  { path: "profile", component: ProfileComponent, canActivate: [AuthGuard] },
  { path: "payroll", component: PayrollComponent, canActivate: [AuthGuard] },
  { path: "salary/:id", component: SalaryFormComponent, canActivate: [AuthGuard] },
  { path: "salary", component: SalaryFormComponent, canActivate: [AuthGuard] },
  { path: "payslip/:id", component: PayslipComponent, canActivate: [AuthGuard] },
  { path: "leave", component: LeaveRequstComponent, canActivate: [AuthGuard] },
  { path: "login", component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
