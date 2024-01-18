import { Component, DoCheck, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Model } from '../service/repository.service';
import { Employee } from '../model/employee.model';
import { DataSource } from '../service/db.service';
import { MatDialog } from '@angular/material/dialog';
import { UpdatepopupComponent } from '../updatepopup/updatepopup.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

 

  constructor(private model: Model, public dialog: MatDialog, 
    private service: DataSource) {
      
  };


getEmployee(){
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
