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

const routes: Routes = [
  { path: "", component: DisplayComponent, canActivate: [AuthGuard] },
  { path: "display", component: DisplayComponent, canActivate: [AuthGuard] },
  { path: "home", component: HomeComponent, canActivate: [AuthGuard] },
  { path: "form/add", component: RegisterComponent },
  { path: "form/edit/:id", component: RegisterComponent, canActivate: [AuthGuard] },
  { path: "profile/:id", component: ProfileComponent, canActivate: [AuthGuard] },
  { path: "profile", component: ProfileComponent, canActivate: [AuthGuard] },
  { path: "leave", component: LeaveRequstComponent, canActivate: [AuthGuard] },
  { path: "login", component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
