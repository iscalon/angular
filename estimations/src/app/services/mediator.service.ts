import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize } from 'rxjs';
import { Expectation, TaskCompletionProbabilities } from '../model/task-completion-probabilities';
import { ExpectationService } from './expectation-service';

@Injectable({
  providedIn: 'root'
})
export class MediatorService {
  
  isLoading = false;
  private tasks$ = new BehaviorSubject<TaskCompletionProbabilities[]>([]);
  currentTasks$ = this.tasks$.asObservable();
  private tasksExpectations$ = new BehaviorSubject<Expectation[]>([]);
  currentExpectations$ = this.tasksExpectations$.asObservable();
  private globalExpectation$ = new BehaviorSubject<Expectation | null>(null);
  currentGlobalExpectation$ = this.globalExpectation$.asObservable();

  constructor(private readonly expectationService: ExpectationService) { }

  updateTasks(tasks?: TaskCompletionProbabilities[]): void {
    this.isLoading = true;
    this.tasks$.next([]);
    this.tasksExpectations$.next([]);
    this.globalExpectation$.next(null);

    if(!tasks) {
      this.isLoading = false;
      return;
    }

    const expectations = this.expectationService.compute(tasks);
    if(!expectations) {
      this.isLoading = false;
      return;
    }

    this.tasks$.next(tasks);
    this.tasksExpectations$.next(expectations.tasksExpectations);
    this.globalExpectation$.next(expectations.globalExpectation);
    this.isLoading = false;
  }
}
