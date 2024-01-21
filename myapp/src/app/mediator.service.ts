import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Quotation } from './quotation-service-interface';

@Injectable({
  providedIn: 'root'
})
export class MediatorService {

  private quotation$ = new BehaviorSubject<Quotation | undefined>(undefined);
  currentQuotation$ = this.quotation$.asObservable();

  constructor() { }

  followQuotation(quotation?: Quotation) {
    this.quotation$.next(quotation);
  }
}
