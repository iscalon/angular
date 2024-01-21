import { Component, OnDestroy, OnInit } from '@angular/core';
import { Quotation, QuotationServiceInterface } from '../quotation-service-interface';
import { BehaviorSubject, Subscription, interval, switchMap, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { QuotationService } from '../quotation.service';
import { MediatorService } from '../mediator.service';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'right-side',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet],
  templateUrl: './right-side.component.html',
  styleUrl: './right-side.component.css',
  providers: [{ provide: QuotationServiceInterface, useClass: QuotationService }]
})
export class RightSideComponent implements OnInit, OnDestroy {

  quotations$ = new BehaviorSubject<Quotation[]>([]);
  subscription?: Subscription;
  loading = true;

  constructor(
    private readonly quotations: QuotationServiceInterface,
    private readonly mediator: MediatorService,
    private readonly router: Router,
    private readonly route: ActivatedRoute) { }

  ngOnInit(): void {
    this.subscription = interval(1000).pipe(
      switchMap(_ => this.quotations.getQuotations()),
      tap(_ => this.loading = false)
    ).subscribe({
      next: (quotations) => this.quotations$?.next(quotations),
      error: (err) => console.log(err),
      complete: () => console.log('Finished')
    })
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  followQuotation(quotation?: Quotation) {
    if (!quotation) {
      console.log('No quotation selected');
      return;
    }
    console.log(`Following quotation ${quotation.name}`);
    this.mediator.followQuotation(quotation);
    this.router.navigate([
      {
        outlets: {
          primary: ['right', 'followed'], // Not 'right/followed' to avoid '/' to become '%2F' resulting in navigation error.
          secondaire: ['empty']
        }
      }
    ]/*, {relativeTo:this.route}*/);
  }
}
