import { Injectable } from "@angular/core";
import { Observable, ReplaySubject } from "rxjs";
import { Employee } from "../model/employee.model";
import { DataSource } from "./db.service";

@Injectable()
export class Model {
    private employee: Employee[];
    private locator = (p: Employee, id?: string) => p.id == id;
    private replaySubject: ReplaySubject<Employee[]>;

    constructor(private dataSource: DataSource) {
        this.employee = new Array<Employee>();
        this.replaySubject = new ReplaySubject<Employee[]>(1);
        this.dataSource.getData().subscribe(data => {
            this.employee = data;
            this.replaySubject.next(data);
            this.replaySubject.complete();
        })
    }

    getAllEmployee(): Employee[] {
        return this.employee;
    }

    getEmployee(id: string): Employee | undefined {
        return this.employee.find(p => this.locator(p, id));
    }



    getEmployeeObservable(id: string): Observable<Employee | undefined> {
        let subject = new ReplaySubject<Employee | undefined>(1);
        this.replaySubject.subscribe(products => {
            subject.next(products.find(p => this.locator(p, id)));
            subject.complete();
        });
        return subject;
    }

    saveEmployee(employee: Employee) {
        this.dataSource.saveData(employee)
            .subscribe(p => this.employee.push(p));
    }

    updateEmployee(employee: Employee) {
        this.dataSource.updateData(employee).subscribe(p => {
            let index = this.employee.findIndex(emp => {
                this.locator(emp, p.id);
                this.employee.splice(index, 1, p);
            })
        })
    }



    deleteEmployee(id: string) {
        this.dataSource.deleteData(id).subscribe(() => {
            let index = this.employee.findIndex(e => this.locator(e, id));
            if (index > -1) {
                this.employee.splice(index, 1);
            }
        })
    }


    isloggedin() {
        return sessionStorage.getItem('username') != null;
    }

    getrole() {
        return sessionStorage.getItem('role') != null ? sessionStorage.getItem('role')?.toString() : '';
    }

    isAdmin(): boolean{
        return this.getrole() === "admin";
    }

}