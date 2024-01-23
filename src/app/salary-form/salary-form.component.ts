import { Component, DoCheck } from '@angular/core';
import { Model } from '../service/repository.service';
import { SalaryService } from '../service/salary.service';
import { Employee } from '../model/employee.model';
import { FormBuilder, Validators } from '@angular/forms';
import { Salary } from '../model/salary.model';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-salary-form',
  templateUrl: './salary-form.component.html',
  styleUrls: ['./salary-form.component.scss']
})
export class SalaryFormComponent {

salary: Salary =new Salary();
editing: boolean = false;

  constructor(private empService: Model, private salService: SalaryService, private builder: FormBuilder,
    public toster: ToastrService, private activeRoute: ActivatedRoute, private route: Router) {

      activeRoute.params.subscribe(params => {
        let id = params["id"];
        if (id != null) {
          salService.getSalaryObservable(id).subscribe(sal => {
            this.editing = true;
            Object.assign(this.salary, sal || new Salary());
            this.slaryForm.patchValue(this.salary);
          });
        }
      })
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
          this.route.navigateByUrl("/payroll");
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
