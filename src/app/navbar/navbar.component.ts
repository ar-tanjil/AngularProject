import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { Model } from '../service/repository.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

isAdmin: boolean;
      constructor(private route: Router, private model: Model){
          this.isAdmin = model.isAdmin();
      }

      

     

      logOut(){
        sessionStorage.clear();
        this.route.navigateByUrl("/login");
      }
}
