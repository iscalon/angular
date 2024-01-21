import { Component, OnDestroy, OnInit } from '@angular/core';
import { MediatorService } from '../mediator.service';
import { Subscription, interval, map, switchMap, tap } from 'rxjs';
import { QuotationServiceInterface } from '../quotation-service-interface';
import { QuotationService } from '../quotation.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'quotation-details',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet, FormsModule, ReactiveFormsModule],
  templateUrl: './quotation-details.component.html',
  styleUrl: './quotation-details.component.css',
  providers: [
    { provide: QuotationServiceInterface, useClass: QuotationService }
  ]
})
export class QuotationDetailsComponent implements OnInit, OnDestroy {

  private subscription?: Subscription;
  loading = true;
  formGroup = this.formBuilder.group({
    name: this.formBuilder.nonNullable.control('', Validators.required),
    value: this.formBuilder.nonNullable.control(0, Validators.required),
    quantity: [0, [Validators.required, Validators.min(1), Validators.max(500)]]
  });

  constructor(
    private readonly quotations: QuotationServiceInterface,
    private readonly mediator: MediatorService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router) {
  }

  ngOnInit(): void {
    this.subscription =
      interval(1000).pipe(
        switchMap(_ => this.mediator.currentQuotation$),
        map(quotation => quotation?.name),
        switchMap(quotationName => this.quotations.getQuotation(quotationName)),
        tap((quotation) => {
          if (quotation) {
            this.loading = false;
          } else {
            this.loading = true;
          }
        })
      ).subscribe((quotation) => {
        this.formGroup.patchValue({
          name: quotation?.name,
          value: quotation?.value
        });
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onSubmit(): void {
    const params = {
      name: this.formGroup.value.name,
      value: this.formGroup.value.value,
      quantity: this.formGroup.value.quantity
    };

    this.router.navigate([{ outlets: { secondaire: ['bought'] } }], {
      queryParams: params
    });
  }

  canSubmit(): boolean {
    return this.formGroup.valid;
  }

  getQuantityErrors(): string[] {
    let res: string[] = [];
    for(let key in this.formGroup.controls.quantity.errors) {
      res.push(JSON.stringify(this.formGroup.controls.quantity.errors[key]));
    }
    
    return res;
  }
}
