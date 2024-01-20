import { Injectable } from "@angular/core";
import { Observable, ReplaySubject } from "rxjs";
import { Employee } from "../model/employee.model";
import { DataSource } from "./db.service";
import { Role } from "../model/role.model";
import { Department } from "../model/department.model";

@Injectable()
export class Model {
    private employee: Employee[];
    private locator = (p: Employee, id?: string) => p.id == id;
    private replaySubject: ReplaySubject<Employee[]>;
    private rolelist: any;
    private departmentList: any;
    private designationList: any;
    private userNameList: string[] = [];

    constructor(private dataSource: DataSource) {
        this.employee = new Array<Employee>();
        this.replaySubject = new ReplaySubject<Employee[]>(1);
        this.dataSource.getData().subscribe(data => {
            this.employee = data;
            this.retriveUserName(this.employee);
            this.replaySubject.next(data);
            this.replaySubject.complete();
        })

        this.dataSource.getDepartment().subscribe(department => {
            this.departmentList = department;
        })

        this.dataSource.getuserrole().subscribe(roles => {
            this.rolelist = roles;
        })

        this.dataSource.getDesignation().subscribe(designation => {
            this.designationList = designation;
        })
    }

    getAllEmployee(): Employee[] {
        return this.employee;
    }

    getEmployee(id: string): Employee | undefined {
        return this.employee.find(p => this.locator(p, id));
    }



    getUserNameList() {
        return this.userNameList;
    }

    getEmployeeObservable(id: string): Observable<Employee | undefined> {
        let subject = new ReplaySubject<Employee | undefined>(1);
        this.replaySubject.subscribe(emp => {
            subject.next(emp.find(p => this.locator(p, id)));
            subject.complete();
        });
        return subject;
    }


    saveEmployee(employee: Employee) {
        if (!this.employee.find(x => x.id == employee.id)) {
            this.dataSource.saveData(employee)
                .subscribe(p => this.employee.push(p));
        } else {
            this.dataSource.updateData(employee).subscribe(p => {
                let index = this.employee
                    .findIndex(item => this.locator(item, p.id));
                this.employee.splice(index, 1, p);
                return this.getEmployeeObservable(employee.id ?? "");
            });
        }
    }



    deleteEmployee(id: string) {
        this.dataSource.deleteData(id).subscribe(() => {
            let index = this.employee.findIndex(e => this.locator(e, id));
            if (index > -1) {
                this.employee.splice(index, 1);
            }
        })
    }


    private retriveUserName(employee: Employee[]) {
        employee.forEach(x => this.userNameList.push(x.id ?? ""))
    }


    isloggedin() {
        return sessionStorage.getItem('username') != null;
    }

    getrole() {
        return sessionStorage.getItem('role') != null ? sessionStorage.getItem('role')?.toString() : '';
    }

    isAdmin(): boolean {
        return this.getrole() === "admin";
    }

    getRoleList(): Role[] {
        return this.rolelist;
    }

    getDepartmentList(): Department[] {
        return this.departmentList;
    }

    getDesignationLis() {
        return this.designationList;
    }

}