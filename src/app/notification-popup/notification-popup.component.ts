import { Component, DoCheck, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Model } from '../service/repository.service';
import { ToastrService } from 'ngx-toastr';
import { Employee } from '../model/employee.model';
import { Leave } from '../model/leave';
import { LeaveService } from '../service/leaveService';

@Component({
  selector: 'app-notification-popup',
  templateUrl: './notification-popup.component.html',
  styleUrls: ['./notification-popup.component.scss']
})
export class NotificationPopupComponent implements DoCheck, OnInit {

  applicationLog: Leave[] = [];
  pendigLeave: Leave[] = [];
  constructor(private builder: FormBuilder, private service: Model, private toastr: ToastrService,
    private dialogref: MatDialogRef<NotificationPopupComponent>, @Inject(MAT_DIALOG_DATA) public data: Leave,
    private leaveService: LeaveService) {

  }

  ngOnInit(): void {
    if (this.data.name != '' && this.data.id != null) {
      this.loaduserdata(this.data.name ?? "");
    }                                            
  }


  ngDoCheck(): void {
   
    this.pendigLeave = this.getPendingLeave();
  }



  getName(id: string) {
    let employee: Employee = new Employee();
    this.service.getEmployeeObservable(id).subscribe(emp => {
      Object.assign(employee, emp);
    })
    return employee.name;
  }

  getPendingLeave() {
    this.applicationLog = this.leaveService.getAllLeave();
    let pendingLeave: Leave[] = [];
    this.applicationLog.forEach(leave => {
      if (leave.status == 'pending') {
        pendingLeave.push(leave);
      }
    })
    return pendingLeave;
  }

  editdata!: Employee;
  loaduserdata(code: string) {
    this.service.getEmployeeObservable(code).subscribe(emp => {
      this.editdata = emp ?? new Employee();
    })
  }

  accept(id: number | undefined){
    let leave: Leave = this.leaveService.getLeaveById(id ?? -1) ?? new Leave();
    leave.status = "accept";
    this.leaveService.saveLeaveRequest(leave);
  }


  reject(id: number | undefined){
    let leave: Leave = this.leaveService.getLeaveById(id ?? -1) ?? new Leave();
    leave.status = "reject";
    this.leaveService.saveLeaveRequest(leave);
  }

}
