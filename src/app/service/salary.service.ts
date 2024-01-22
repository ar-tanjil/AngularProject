import { Injectable } from "@angular/core";
import { Salary } from "../model/salary.model";
import { Observable, ReplaySubject } from "rxjs";
import { DataSource } from "./db.service";

@Injectable()
export class SalaryService{

    private salary: Salary[];
    private replaySubject: ReplaySubject<Salary[]>;
    private locator = (l: Salary, id?: string) => l.id == id;


    constructor(private service: DataSource) {
        this.salary = new Array<Salary>();
        this.replaySubject = new ReplaySubject<Salary[]>(1);
        this.service.getSalary().subscribe(salary => {
            this.salary = salary;
            this.replaySubject.next(salary);
            this.replaySubject.complete();
        })
    }

    getAllSalary(): Salary[] {
        return this.salary;
    }

    getSalaryById(id: string): Salary | undefined {
        return this.salary.find(p => this.locator(p, id))
    }

    saveSalary(salary: Salary) {
        if (!this.salary.find(x => x.id == salary.id)) {
            this.service.saveSalary(salary)
                .subscribe(p => this.salary.push(p));
        } else {
            this.service.updateSalary(salary).subscribe(p => {
                let index = this.salary
                    .findIndex(item => this.locator(item, p.id));
                this.salary.splice(index, 1, p);

            });
        }
        return this.getSalaryObservable(salary.id ?? "");
    }


    getSalaryObservable(id: string): Observable<Salary| undefined> {
        let subject = new ReplaySubject<Salary | undefined>(1);
        this.replaySubject.subscribe(emp => {
            subject.next(emp.find(l => this.locator(l, id)));
            subject.complete();
        });
        return subject;
    }


    // getEmployeeObservable(id: string): Observable<Employee | undefined> {
    //     let subject = new ReplaySubject<Employee | undefined>(1);
    //     this.replaySubject.subscribe(emp => {
    //         subject.next(emp.find(p => this.locator(p, id)));
    //         subject.complete();
    //     });
    //     return subject;
    // }


    deleteSalary(id: string) {
        this.service.deleteSalary(id).subscribe(() => {
            let index = this.salary.findIndex(l => this.locator(l, id));
            if (index > -1) {
                this.salary.splice(index, 1);
            }
        })
    }



}