import { Component } from '@angular/core';
import { Model } from '../service/repository.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Employee } from '../model/employee.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  employee: Employee = new Employee();
  isLoggedIn: boolean = false;

  constructor(public model: Model, activeRoute: ActivatedRoute,
    public router: Router, private builder: FormBuilder) {
    this.isLoggedIn = this.model.isloggedin();

    activeRoute.params.subscribe(params => {
      let id = params["id"];
      if(id == null){
        id = sessionStorage.getItem("username");
      }
      if (id != null) {
        model.getEmployeeObservable(id).subscribe(p => {
          Object.assign(this.employee, p || new Employee());
          this.registerform.patchValue(this.employee);
        });
      }
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


}
