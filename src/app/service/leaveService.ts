import { Injectable } from "@angular/core";
import { DataSource } from "./db.service";
import { Leave } from "../model/leave";
import { Observable, ReplaySubject } from "rxjs";

@Injectable()
export class LeaveService {
    private leave: Leave[];
    private replaySubject: ReplaySubject<Leave[]>;
    private locator = (l: Leave, id?: number) => l.id == id;


    constructor(private service: DataSource) {
        this.leave = new Array<Leave>();
        this.replaySubject = new ReplaySubject<Leave[]>(1);
        this.service.getLeaveRequest().subscribe(leave => {
            this.leave = leave;
            this.replaySubject.next(leave);
            this.replaySubject.complete();
        })
    }

    getAllLeave(): Leave[] {
        return this.leave;
    }

    getLeaveById(id: number): Leave | undefined {
        return this.leave.find(p => this.locator(p, id))
    }

    saveLeaveRequest(leave: Leave) {
        if (!this.leave.find(x => x.id == leave.id)) {
            this.service.saveLeaveRequest(leave)
                .subscribe(p => this.leave.push(p));
        } else {
            this.service.updateLeaveRequest(leave).subscribe(p => {
                let index = this.leave
                    .findIndex(item => this.locator(item, p.id));
                this.leave.splice(index, 1, p);

            });
        }
        return this.getLeaveObservable(leave.id ?? -1);
    }


    getLeaveObservable(id: number): Observable<Leave | undefined> {
        let subject = new ReplaySubject<Leave | undefined>(1);
        this.replaySubject.subscribe(emp => {
            subject.next(emp.find(l => this.locator(l, id)));
            subject.complete();
        });
        return subject;
    }

    deleteLeaveRequest(id: number) {
        this.service.deleteLeaveRequest(id).subscribe(() => {
            let index = this.leave.findIndex(l => this.locator(l, id));
            if (index > -1) {
                this.leave.splice(index, 1);
            }
        })
    }


    getAllPendigLeave() {
        let pending: Leave[] = [];
        this.leave.forEach(l => {
            if (l.status == 'pending') {
                pending.push(l);
            }
        })
        return pending;
    }


    getUserLeave(name: string): Observable<Leave[] | undefined> {
        let userLeave: Leave[] = [];
        let repalySub = new ReplaySubject<Leave[]>(1);
        this.leave.forEach(l => {
            if (l.name == name) {
                userLeave.push(l);
            }
        })
        repalySub.next(userLeave);
        repalySub.complete();
        return repalySub;
    }

}