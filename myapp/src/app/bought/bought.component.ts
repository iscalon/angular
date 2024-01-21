import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Quotation } from '../quotation-service-interface';
import { BehaviorSubject, Subscription, map } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'bought',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bought.component.html',
  styleUrl: './bought.component.css'
})
export class BoughtComponent implements OnInit, OnDestroy {

  constructor(private readonly route: ActivatedRoute) { }

  subscription?: Subscription;
  bought$ = new BehaviorSubject<QuotationQuantity>({
    name: '',
    value: 0,
    quantity: 0
  })

  private initQuotation(): void {
    this.subscription = this.route.queryParamMap.pipe(
      map(queryParams => {
        const name: string = queryParams.get('name') ?? '';
        const value: number = parseInt(queryParams.get('value') ?? '0', 10);
        const quantity: number = parseInt(queryParams.get('quantity') ?? '0', 10);
        return {
          name,
          value,
          quantity
        } as QuotationQuantity
      })
    )
    .subscribe(q => this.bought$.next(q));
  }

  ngOnInit(): void {
    this.initQuotation();
  }

  ngOnDestroy(): void {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

interface QuotationQuantity extends Quotation {
  quantity: number
}
