import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Employee } from '../model/employee.model';
import { FormBuilder, Validators } from '@angular/forms';
import { Model } from '../service/repository.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-updatepopup',
  templateUrl: './updatepopup.component.html',
  styleUrls: ['./updatepopup.component.scss'],
})
export class UpdatepopupComponent {
  constructor(private builder: FormBuilder, private service: Model, private toastr: ToastrService,
    private dialogref: MatDialogRef<UpdatepopupComponent>, @Inject(MAT_DIALOG_DATA) public data: Employee) {
    this.rolelist = this.service.getRoleList();
    this.departmentList = this.service.getDepartmentList();

  }


  ngOnInit(): void {
    if (this.data.id != '' && this.data.id != null) {
      this.loaduserdata(this.data.id);
    }
  }
  rolelist: any;
  editdata: any;
  departmentList:any;

  registerform = this.builder.group({
    id: this.builder.control(''),
    name: this.builder.control(''),
    password: this.builder.control(''),
    email: this.builder.control(''),
    gender: this.builder.control('male'),
    designation: this.builder.control(""),
    department: this.builder.control(""),
    role: this.builder.control('', Validators.required),
    isactive: this.builder.control(false)
  });

  loaduserdata(code: string) {
    this.service.getEmployeeObservable(code).subscribe(emp => {
      this.editdata = emp;
      this.registerform.setValue(this.editdata);
    })
  }

employee: Employee = new Employee();
  
  UpdateUser() {
    Object.assign(this.employee, this.registerform.value);
    this.service.saveEmployee(this.employee);
      this.toastr.success('Updated successfully.');
      this.dialogref.close();
    };

  }

