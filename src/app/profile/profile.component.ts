import { Component, DoCheck } from '@angular/core';
import { Model } from '../service/repository.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Employee } from '../model/employee.model';
import { ToastrService } from 'ngx-toastr';
import { Leave } from '../model/leave';
import { LeaveService } from '../service/leaveService';
import { SalaryService } from '../service/salary.service';
import { Salary } from '../model/salary.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  employee: Employee = new Employee();
  isAdmin: boolean = false;
  currentAdmin: boolean = false;
  aplicationLog: Leave[] = [];
  appId!: string;
  salary: Salary = new Salary();

  constructor(public model: Model, activeRoute: ActivatedRoute,
    public router: Router, private builder: FormBuilder, private toast: ToastrService, public leaveService: LeaveService,
    private salService: SalaryService) {
    this.isAdmin = this.model.isAdmin();
    activeRoute.params.subscribe(params => {
      let id = params["id"];
      let adminId = sessionStorage.getItem("username");
      if (id != null && id != adminId) {
        this.currentAdmin = false;
      } else {
        this.currentAdmin = true;
        id = adminId;
      }
      if (id != null) {
        this.appId = id;
        this.model.getEmployeeObservable(this.appId).subscribe(p => {
          Object.assign(this.employee, p || new Employee());
          this.salService.getSalaryObservable(this.appId).subscribe(sal => {
            Object.assign(this.salary, sal);
            this.leaveService.getUserLeave(this.appId ?? "").subscribe(leave => {
              Object.assign(this.aplicationLog, leave);
            })
          })
        });
      }
    })
  }



  delete() {
    this.model.deleteEmployee(this.employee.id ?? "");
    this.toast.success("Delete Successfully"),
      this.router.navigateByUrl("/")
  }

}
