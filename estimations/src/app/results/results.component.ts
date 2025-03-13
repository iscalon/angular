import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MediatorService } from '../services/mediator.service';
import { Expectation, TaskCompletionProbabilities } from '../model/task-completion-probabilities';
import { Observable, map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip'; 
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
    selector: 'app-results',
    imports: [
        MatTableModule,
        MatIconModule,
        MatButtonModule,
        MatTooltipModule,
        RouterModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule
    ],
    templateUrl: './results.component.html',
    animations: [
        trigger('detailExpand', [
            state('collapsed,void', style({ height: '0px', minHeight: '0' })),
            state('expanded', style({ height: '*' })),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ],
    styleUrl: './results.component.css'
})
export class ResultsComponent implements OnInit {

  readonly defaultActorsCount = 1;
  readonly defaultParallelisationPercentage = 100;
  readonly columnsToDisplay = ['name', 'mu', 'muAdjusted', 'sigma', 'sigmaAdjusted'];
  readonly columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  readonly dataSource = new MatTableDataSource<Expectation>();
  expandedElement?: Expectation;

  form = this.formBuilder.group({
    actorsCount: this.defaultActorsCount,
    parallelisationPercentage: this.defaultParallelisationPercentage
  });
  
  constructor(
    private readonly mediator: MediatorService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router) { }

  ngOnInit(): void {
    this.expectations$.subscribe(expectations => this.dataSource.data = expectations);
  }

  get expectations$(): Observable<Expectation[]> {
    return this.mediator.currentExpectations$;
  }

  get globalExpectation$(): Observable<Expectation | null> {
    return this.mediator.currentGlobalExpectation$;
  }

  get tasks$(): Observable<TaskCompletionProbabilities[]> {
    return this.mediator.currentTasks$;
  }

  getSigmaTotal$(): Observable<number | null> {
    return this.globalExpectation$.pipe(
      map(expectation => expectation?.standardDeviation ?? null)
    );
  }

  getMuTotal$(): Observable<number | null> {
    return this.globalExpectation$.pipe(
      map(expectation => expectation?.completionTime ?? null)
    );
  }

  getTooltip(expectation?: Expectation): string {
    if(!expectation) {
      return '';
    }
    const task = expectation.task;
    if(!task) {
      return '';
    }
    return `[${task.taskName ?? ''}] BEST: ${task.bestTime} AVERAGE: ${task.averageTime} WORST: ${task.worstTime}`;
  }

  goBack() {
    this.router.navigate(['']);
  }

  computeAdjustedCompletionTime(expectation?: Expectation): number | undefined {
    if(!expectation) {
      return undefined;
    }
    return this.computeBrooksAmdahlMetcalfeTime(expectation.completionTime);
  }

  computeAdjustedStandardDeviationTime(expectation?: Expectation): number | undefined {
    if(!expectation) {
      return undefined;
    }
    return this.computeBrooksAmdahlMetcalfeTime(expectation.standardDeviation);
  }

  computeBrooksAmdahlMetcalfeTime(time?: number | null): number | undefined {
    if(!time) {
      return undefined;
    }
    const p = this.getParallelisationPercentage() / 100.0;
    const n = this.getActorsCount();
    return time*((1-p)+p/n)*(1+0.05* Math.pow(n-1, 1.5));
  }
  
  private getActorsCount(): number {
    return this.form.value.actorsCount ?? this.defaultActorsCount;
  }

  private getParallelisationPercentage(): number {
    return this.form.value.parallelisationPercentage ?? this.defaultParallelisationPercentage;
  }
}
