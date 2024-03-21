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

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    RouterModule,
    CommonModule
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

  readonly columnsToDisplay = ['name', 'mu', 'sigma'];
  readonly columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  readonly dataSource = new MatTableDataSource<Expectation>();
  expandedElement?: Expectation;

  constructor(
    private readonly mediator: MediatorService,
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
}
