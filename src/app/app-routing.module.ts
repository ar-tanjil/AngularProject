import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/routing.guard';

const routes: Routes = [
  {path: "", component: HomeComponent, canActivate:[AuthGuard]},
  {path:"home", component:HomeComponent, canActivate:[AuthGuard]},
  {path: "form/:mode/:id", component:RegisterComponent},
  {path: "form/:mode", component:RegisterComponent},
  {path: "login", component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
