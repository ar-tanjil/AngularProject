import { Component, DoCheck, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Model } from '../service/repository.service';
import { MessageService } from '../service/messageService';
import { MatDialog } from '@angular/material/dialog';
import { NotificationPopupComponent } from '../notification-popup/notification-popup.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {



  sideNav: boolean = true;
  date: Date;


  isAdmin: boolean;
  constructor(private route: Router, private model: Model, private messageService: MessageService, public dialog: MatDialog) {
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



  seeNotification() {
    let id = sessionStorage.getItem("username")?? "";
    this.OpenDialog('100ms', '100ms', id);


  }

  OpenDialog(enteranimation: any, exitanimation: any, code: string) {
    const popup = this.dialog.open(NotificationPopupComponent, {
      enterAnimationDuration: enteranimation,
      exitAnimationDuration: exitanimation,
      width: '30%',
      data: {
        id: code
      }
    });
    popup.afterClosed().subscribe(res => {

    });
  }

}
