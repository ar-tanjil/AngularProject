import { Component, DoCheck } from '@angular/core';
import { Model } from '../service/repository.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Employee } from '../model/employee.model';
import { ToastrService } from 'ngx-toastr';
import { Leave } from '../model/leave';
import { LeaveService } from '../service/leaveService';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements DoCheck {
  employee: Employee = new Employee();
  isAdmin: boolean = false;
  currentAdmin: boolean = false;
  aplicationLog: Leave[] = [];
  appId!: string;


  constructor(public model: Model, activeRoute: ActivatedRoute,
    public router: Router, private builder: FormBuilder, private toast: ToastrService, public leaveService: LeaveService) {
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
        model.getEmployeeObservable(id).subscribe(p => {
          Object.assign(this.employee, p || new Employee());
          this.registerform.patchValue(this.employee);
        });
      }
    })
  }


  ngDoCheck(): void {
    this.leaveService.getUserLeave(this.appId ?? "").subscribe(leave => {
      Object.assign(this.aplicationLog, leave);
    })
  }


  registerform = this.builder.group({
    id: this.builder.control('', Validators.required),
    name: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required),
    email: this.builder.control('', Validators.email),
    gender: this.builder.control('male'),
    designation: this.builder.control(""),
    department: this.builder.control(""),
    role: this.builder.control(''),
    isactive: this.builder.control(false),
    salary: this.builder.control(0),
    joinDate: this.builder.control(new Date())
  });



  delete() {
    this.model.deleteEmployee(this.employee.id ?? "");
    this.toast.success("Delete Successfully")
  }

}
