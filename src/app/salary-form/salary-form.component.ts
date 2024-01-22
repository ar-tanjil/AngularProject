import { Component, DoCheck } from '@angular/core';
import { Model } from '../service/repository.service';
import { SalaryService } from '../service/salary.service';
import { Employee } from '../model/employee.model';
import { FormBuilder, Validators } from '@angular/forms';
import { Salary } from '../model/salary.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-salary-form',
  templateUrl: './salary-form.component.html',
  styleUrls: ['./salary-form.component.scss']
})
export class SalaryFormComponent {


  constructor(private empService: Model, private salService: SalaryService, private builder: FormBuilder,
    public toster: ToastrService) {

  }


  slaryForm = this.builder.group({
    id: this.builder.control('', Validators.required),
    currentMonth: this.builder.control(new Date()),
    basic: this.builder.control(new Number()),
    conveyance: this.builder.control(new Number()),
    medicalAllowance: this.builder.control(new Number()),
    providentFund: this.builder.control(new Number()),
    leaveDeduction: this.builder.control(new Number()),
    tax: this.builder.control(new Number()),
    status: this.builder.control("due"),
  });


  getUserId() {
    let employee: Employee[] = [];
    this.empService.getAllEmployee().forEach(emp => {
      if (emp.salary == 0) {
        employee.push(emp);
      }
    });
    return employee;
  }


  submitForm() {
    let salary: Salary = new Salary();
    let employee: Employee = new Employee();
    if (this.slaryForm.valid) {
      Object.assign(salary, this.slaryForm.value);
      
      if(salary.id != null){
        this.empService.getEmployeeObservable(salary.id).subscribe(emp => {
          Object.assign(employee, emp);
          employee.salary = this.salaryTotal(salary);
          this.empService.saveEmployee(employee);
          this.salService.saveSalary(salary);
          this.toster.success("Successfull");
          this.slaryForm.reset();
        })
      }
    }

  }


  salaryTotal(salary: Salary): number{
    let total: number = ((salary.basic ?? 0) + (salary.conveyance ?? 0) + (salary.medicalAllowance ?? 0)) - 
    ((salary.leaveDeduction ?? 0 )+ (salary.providentFund ?? 0)+ (salary.tax??0));
    return total;
  }


}
