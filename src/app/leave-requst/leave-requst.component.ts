import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Leave } from '../model/leave';
import { LeaveService } from '../service/leaveService';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-leave-requst',
  templateUrl: './leave-requst.component.html',
  styleUrls: ['./leave-requst.component.scss']
})
export class LeaveRequstComponent {

  id: string = sessionStorage.getItem("username") ?? "";
  constructor(private builder: FormBuilder, private service: LeaveService, private toaster: ToastrService) {

  }

  leaveForm = this.builder.group({
    name: this.builder.control(this.id),
    type: this.builder.control(""),
    reason: this.builder.control(""),
    from: this.builder.control(new Date()),
    to: this.builder.control(new Date()),
    status: this.builder.control("pending")
  })

  leave: Leave = new Leave();

  submitForm() {
    Object.assign(this.leave, this.leaveForm.value);
    this.service.saveLeaveRequest(this.leave);
    this.toaster.success("Success");
    this.leaveForm.reset();
  }




}
