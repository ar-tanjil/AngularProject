import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Model } from '../service/repository.service';
import { Employee } from '../model/employee.model';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent {

  user: Employee = new Employee();
  id: string;
  constructor(private route: Router, private model: Model) {
    this.id = sessionStorage.getItem("username") ?? "";
    if (this.id !== "") {
      this.model.getEmployeeObservable(this.id).subscribe(emp => {
        Object.assign(this.user, emp ?? new Employee);
      })
    }
  }





}
