import { Injectable } from '@angular/core';
import { Quotation, QuotationServiceInterface } from './quotation-service-interface';
import { Observable, interval, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuotationService extends QuotationServiceInterface {

  private readonly QUOTATION_NAMES: string[] = ['USD', 'JPY', 'CHF']

  constructor() {
    super();
  }

  override getQuotations(): Observable<Quotation[]> {
    return of(this.computeQuotations());
  }

  override getQuotation(name?: string): Observable<Quotation | undefined> {
    return of(this.computeQuotations().find(quotation => quotation.name === name));
  }

  private computeQuotations(): Quotation[] {
    return this.QUOTATION_NAMES.map((name: string): Quotation => { return { name, value: randomInt(100, 500) }; });
  }
}

export const randomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;