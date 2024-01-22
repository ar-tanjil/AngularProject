import { Component } from '@angular/core';
import { SalaryService } from '../service/salary.service';
import { Model } from '../service/repository.service';

@Component({
  selector: 'app-payroll',
  templateUrl: './payroll.component.html',
  styleUrls: ['./payroll.component.scss']
})
export class PayrollComponent {

    constructor(private salService: SalaryService, private empService: Model){

    }

    getAllSalary(){
      return this.salService.getAllSalary();
    }

    getAllEmployee(){
      return this.empService.getAllEmployee();
    }


}
