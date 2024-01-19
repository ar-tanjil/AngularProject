import { Component, DoCheck, IterableDiffers, ViewChild } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { MessageService } from '../service/messageService';
import { ActivatedRoute, Router } from '@angular/router';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements DoCheck {

  constructor(private msgService: MessageService, private route: Router) {
    this.id = sessionStorage.getItem("username") ?? "";
  }




  id: string;
  events: string[] = [];
  opened: boolean = true;
  shouldRun = true;

  dahsboard: boolean = true;
  employee: boolean = false;
  profile: boolean = false;

  toggle() {
    let url = this.route.url;
    if (url.startsWith("/display")) {
      this.dahsboard = true;
      this.employee = false;
      this.profile = false;
    } else if (url.startsWith("/home")) {
      this.employee = true;
      this.dahsboard = false;
      this.profile = false;
    } else if (url.startsWith("/profile")) {
      this.profile = true;
      this.dahsboard = false;
      this.employee = false;
    }
  }


  ngDoCheck(): void {
    this.toggle();
    this.msgService.selectedProduct$.subscribe(item => {
      this.opened = item;
    })
  }

}
