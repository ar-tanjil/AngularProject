import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class MessageService {
    private product$ = new BehaviorSubject<any>({});
    selectedProduct$ = this.product$.asObservable();
    constructor() { }

    setProduct(product: any) {
        this.product$.next(product);
    }
}