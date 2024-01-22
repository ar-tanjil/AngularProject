import { Inject, Injectable, InjectionToken } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Employee } from "../model/employee.model";
import { Role } from "../model/role.model";
import { Leave } from "../model/leave";
import { Department } from "../model/department.model";
import { Designation } from "../model/desigantion.model";
import { Salary } from "../model/salary.model";

export const REST_URL = new InjectionToken("rest_url");

@Injectable()
export class DataSource {

    roleUrl = `http://${location.hostname}:3500/role`
    departUrl = `http://${location.hostname}:3500/department`
    desigUrl = `http://${location.hostname}:3500/disignation`
    leaveUrl = `http://${location.hostname}:3500/leaveRequest`
    salaryUrl= `http://${location.hostname}:3500/salary`


    constructor(private http: HttpClient,
        @Inject(REST_URL) private url: string) {
    }

    getData(): Observable<Employee[]> {
        return this.sendRequest<Employee[]>("GET", this.url);
    }

    saveData(employee: Employee): Observable<Employee> {
        return this.sendRequest<Employee>("POST", this.url, employee);
    }

    updateData(employee: Employee): Observable<Employee> {
        return this.sendRequest<Employee>("PUT",
            `${this.url}/${employee.id}`, employee);
    }

    getOneData(id: any): Observable<Employee> {
        return this.sendRequest<Employee>('GET', `${this.url}/${id}`)
    }

    deleteData(id: string): Observable<Employee> {
        return this.sendRequest<Employee>("DELETE", `${this.url}/${id}`);
    }

    getuserrole(): Observable<Role[]> {
        return this.sendRequest<Role[]>("GET", this.roleUrl);
    }

    getDepartment(): Observable<Department[]> {
        return this.sendRequest<Department[]>("GET", this.departUrl);
    }

    getDesignation(): Observable<Designation[]> {
        return this.sendRequest<Designation[]>("GET", this.desigUrl);
    }


    saveLeaveRequest(leave: Leave): Observable<Leave> {
        return this.sendRequest<Leave>("POST", this.leaveUrl, leave);
    }

    getLeaveRequest(): Observable<Leave[]> {
        return this.sendRequest<Leave[]>("GET", this.leaveUrl);
    }

    updateLeaveRequest(leave: Leave): Observable<Leave> {
        return this.sendRequest<Leave>("PUT", `${this.leaveUrl}/${leave.id}`, leave);
    }

    deleteLeaveRequest(id: number): Observable<Leave> {
        return this.sendRequest<Leave>("DELETE", `${this.leaveUrl}/${id}`);
    }
// 

    saveSalary(salary: Salary): Observable<Salary> {
        return this.sendRequest<Salary>("POST", this.salaryUrl, salary);
    }

    getSalary(): Observable<Salary[]> {
        return this.sendRequest<Salary[]>("GET", this.salaryUrl);
    }

    updateSalary(salary: Salary): Observable<Salary> {
        return this.sendRequest<Salary>("PUT", `${this.salaryUrl}/${salary.id}`, salary);
    }

    deleteSalary(id: string): Observable<Salary> {
        return this.sendRequest<Salary>("DELETE", `${this.salaryUrl}/${id}`);
    }


    private sendRequest<T>(verb: string, url: string,
        body?: Employee | Role | Leave | Department | Designation): Observable<T> {
        return this.http.request<T>(verb, url, {
            body: body
        });
    }



}