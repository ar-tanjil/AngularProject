import { Component, OnInit } from '@angular/core';
import { Model } from '../service/repository.service';
import { Employee } from '../model/employee.model';
import { DataSource } from '../service/db.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent  {


  constructor(private model: Model) {

  };
    
  

  getEmployee(){
    return this.model.getAllEmployee();
  }

}
