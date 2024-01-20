import { Component, DoCheck, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Model } from '../service/repository.service';
import { DataSource } from '../service/db.service';
import { MatDialog } from '@angular/material/dialog';
import { UpdatepopupComponent } from '../updatepopup/updatepopup.component';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  admin: boolean;

  constructor(private model: Model, public dialog: MatDialog,
    private service: DataSource) {
    this.admin = this.model.isAdmin();
  };

  sortValue: string = "All";




  lowValue: number = 0;
  highValue: number = 20;


  // used to build a slice of papers relevant at any given time
  public getPaginatorData(event: PageEvent): PageEvent {
    this.lowValue = event.pageIndex * event.pageSize;
    this.highValue = this.lowValue + event.pageSize;
    return event;
  }





  toggleMenu(name: string) {
    this.sortValue = name;
  }

  getEmployee() {
    return this.model.getAllEmployee();
  }



  updateuser(code: any) {
    this.OpenDialog('100ms', '100ms', code);
  }

  OpenDialog(enteranimation: any, exitanimation: any, code: string) {
    const popup = this.dialog.open(UpdatepopupComponent, {
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
