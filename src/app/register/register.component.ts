import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Employee } from '../model/employee.model';
import { Model } from '../service/repository.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  employee: Employee = new Employee();
  editing: boolean = false;
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
 
  userNameList: string[];
  userInput: boolean = false;
  firstId: string = "";

  constructor(public model: Model, activeRoute: ActivatedRoute,
    public router: Router, private builder: FormBuilder, public toaster: ToastrService) {
    this.isLoggedIn = this.model.isloggedin();
    this.isAdmin = this.model.isAdmin();
    this.userNameList = this.model.getUserNameList();
    activeRoute.params.subscribe(params => {
      this.editing = params["mode"] == "edit";
      let id = params["id"];
      this.firstId = id;
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



  designationList(){
    return this.model.getDesignationLis();
  }

  departmentList(){
    return this.model.getDepartmentList();
  }


  private findUser(id: string) {
    if (id == this.firstId) {
      return false;
    } else {
      return this.userNameList.find(x => x == id);
    }

  }



  submitForm() {
    if (this.findUser(this.registerform.value.id ?? "")) {
      this.registerform.controls["id"].setErrors({
        'incorrect': true
      })
      this.toaster.error("User Name is not avialvel");
    } else if (this.registerform.valid) {
      Object.assign(this.employee, this.registerform.value);
      this.model.saveEmployee(this.employee);
      this.toaster.success("Save Succefull");

      if (this.editing) {
        this.router.navigateByUrl(`/profile/${this.firstId}`);
      } else {
        this.router.navigateByUrl("/home");
      }
    } else {
      this.toaster.error("Enter valid data")
    }
  }



}
