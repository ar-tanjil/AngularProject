import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Model } from '../service/repository.service';
import { ToastrService } from 'ngx-toastr';
import { Employee } from '../model/employee.model';

@Component({
  selector: 'app-notification-popup',
  templateUrl: './notification-popup.component.html',
  styleUrls: ['./notification-popup.component.scss']
})
export class NotificationPopupComponent implements OnInit {


  constructor(private builder: FormBuilder, private service: Model, private toastr: ToastrService,
    private dialogref: MatDialogRef<NotificationPopupComponent>, @Inject(MAT_DIALOG_DATA) public data: Employee) {

  }

  ngOnInit(): void {
    if (this.data.id != '' && this.data.id != null) {
      this.loaduserdata(this.data.id);
    }
  }

  editdata!: Employee;
  loaduserdata(code: string) {
    this.service.getEmployeeObservable(code).subscribe(emp => {
      this.editdata = emp ?? new Employee();
    })
  }

}
