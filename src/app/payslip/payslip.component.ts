import { Component, OnInit } from '@angular/core';
import { Model } from '../service/repository.service';
import { SalaryService } from '../service/salary.service';
import { ActivatedRoute } from '@angular/router';
import { Salary } from '../model/salary.model';
import { Employee } from '../model/employee.model';

@Component({
  selector: 'app-payslip',
  templateUrl: './payslip.component.html',
  styleUrls: ['./payslip.component.scss']
})
export class PayslipComponent  {

  employee: Employee = new Employee();
 
  constructor(private empService: Model, private salService: SalaryService, private activeRoute: ActivatedRoute) {
    activeRoute.params.subscribe(params => {
      let id = params["id"];
      if(id != null){
        this.empService.getEmployeeObservable(id).subscribe(emp => {
          Object.assign(this.employee, emp)
        })
      }
    })
  }

  



  getSalary(id: string) {
    return this.salService.getSalaryById(id);
  }

  getEarningTotal(id: string){
    let salary = this.getSalary(id);
    return ((salary?.basic ?? 0) + (salary?.conveyance ?? 0) + (salary?.medicalAllowance ?? 0));    
  }

  getDeductionTotal(id: string){
    let salary = this.getSalary(id);
    return ((salary?.leaveDeduction ?? 0 )+ (salary?.providentFund ?? 0)+ (salary?.tax??0));    
  }

  getSalaryTotal(id: string): number{
    let salary = this.getSalary(id) ?? new Salary();
    let total: number = ((salary.basic ?? 0) + (salary.conveyance ?? 0) + (salary.medicalAllowance ?? 0)) - 
    ((salary.leaveDeduction ?? 0 )+ (salary.providentFund ?? 0)+ (salary.tax??0));
    return total;
  }

  getMonth(){
    const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
    let date = new Date();
    let month = monthNames[date.getMonth()].toUpperCase();
    let year = date.getFullYear()
    return `${month} ${year}`
  }

}
