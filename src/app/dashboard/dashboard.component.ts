import { Component, DoCheck, IterableDiffers, ViewChild } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { MessageService } from '../service/messageService';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements DoCheck {

  constructor(private msgService: MessageService) {
    this.id = sessionStorage.getItem("username") ?? "";
  }

  id: string;
  events: string[] = [];
  opened: boolean = true;
  shouldRun = true;

  ngDoCheck(): void {
    this.msgService.selectedProduct$.subscribe(item => {
      this.opened = item;
    })
  }

}
