import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataSource } from '../service/db.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private builder: FormBuilder, private toastr: ToastrService, private service: DataSource,
    private router: Router) {
    sessionStorage.clear();

  }

  employee: any;

  loginForm = this.builder.group({
    id: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required),
  });

  proceedLogin() {
    if (this.loginForm.valid) {
      this.service.getOneData(this.loginForm.value.id).subscribe(emp => {
        this.employee = emp;
        console.log(this.employee);
        
        if (this.employee.password == this.loginForm.value.password) {
          if (this.employee.isactive) {
            sessionStorage.setItem('username', this.employee.id);
            sessionStorage.setItem('role', this.employee.role);
            this.toastr.success("Successfully")
            this.router.navigateByUrl("/");
          } else {
            this.toastr.error("Please contact Admin", "InActive User")
          }
        } else {
          this.toastr.error("Invlaid credentials")
        }
      })
    } else {
        this.toastr.error("Please enter valid data")
    }
  }

}
