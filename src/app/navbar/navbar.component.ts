import { Component, DoCheck, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Model } from '../service/repository.service';
import { MessageService } from '../service/messageService';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {



  sideNav: boolean = true;
  date: Date;

  isAdmin: boolean;
  constructor(private route: Router, private model: Model, private messageService: MessageService) {
    this.isAdmin = model.isAdmin();
    this.date = new Date();
  }


  logOut() {
    sessionStorage.clear();
    this.route.navigateByUrl("/login");
  }


  toggle() {
    this.sideNav = this.sideNav ? false : true;
    this.messageService.setProduct(this.sideNav);
  }

}
