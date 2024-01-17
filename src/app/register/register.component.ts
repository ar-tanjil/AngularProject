import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Employee } from '../model/employee.model';
import { Model } from '../service/repository.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  employee: Employee = new Employee();
  editing: boolean = false;

  constructor(public model: Model, activeRoute: ActivatedRoute, 
    public router: Router, private builder: FormBuilder) {

activeRoute.params.subscribe(params => {
    this.editing = params["mode"] == "edit";
    let id = params["id"];          
    if (id != null) {
        model.getEmployeeObservable(id).subscribe(p => {
            Object.assign(this.employee, p || new Employee());
            this.registerform.patchValue(this.employee);
        });    
    }
})
}

registerform = this.builder.group({
  id: this.builder.control('', Validators.required),
  name: this.builder.control('', Validators.required),
  password: this.builder.control('', Validators.required),
  email: this.builder.control('', Validators.email),
  gender: this.builder.control('male'),
  role: this.builder.control(''),
  isactive: this.builder.control(false)
});


  submitForm() {
    if (this.registerform.valid) {	
        Object.assign(this.employee, this.registerform.value);
        this.model.saveEmployee(this.employee);
        console.log(this.employee);
        
        // this.router.navigateByUrl("/");
    }
    console.log(this.employee);
}



}
