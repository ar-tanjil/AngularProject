import { Inject, Injectable, InjectionToken } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Employee } from "../model/employee.model";
import { Role } from "../model/role.model";
export const REST_URL = new InjectionToken("rest_url");

@Injectable()
export class DataSource {
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

    getuserrole() {
        return this.http.get('http://localhost:3500/role');
    }

    getDepartment() {
        return this.http.get('http://localhost:3500/department');

    }


    private sendRequest<T>(verb: string, url: string,
        body?: Employee): Observable<T> {
        return this.http.request<T>(verb, url, {
            body: body
        });
    }
}