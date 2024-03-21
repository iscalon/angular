import { Injectable } from '@angular/core';
import { ExpectationService } from './expectation-service';
import { TaskCompletionProbabilities, Expectations, Expectation } from '../model/task-completion-probabilities';

@Injectable({
  providedIn: 'root'
})
export class ExpectationComputerService implements ExpectationService {

  constructor() { }

  compute(tasks: TaskCompletionProbabilities[]): Expectations | undefined {
    const expectations = this.computeExpectationTimes(tasks);
    const total = this.computeGlobalExpectationTime(expectations);

    return {
      globalExpectation: total,
      tasksExpectations: expectations
    }
  }

  private computeExpectationTime(task: TaskCompletionProbabilities): Expectation {
    const sigma = (task.worstTime - task.bestTime) / 6.0;
    const mu = (task.bestTime + 4 * task.averageTime + task.worstTime) / 6.0;
    return {
      completionTime: mu,
      standardDeviation: sigma,
      taskName: task.taskName,
      task
    }
  }

  private computeExpectationTimes(tasks: TaskCompletionProbabilities[]): Expectation[] {
    return tasks.map(task => this.computeExpectationTime(task));
  }

  private computeGlobalExpectationTime(expectations: Expectation[]): Expectation {
    const taskName = 'Total';
    if (expectations.length <= 0) {
      return {
        completionTime: 0,
        standardDeviation: 0,
        taskName
      }
    }

    const sigma = Math.sqrt(expectations
      .map(expectation => expectation.standardDeviation)
      .map(s => Math.pow(s, 2))
      .reduce((a, b) => a + b, 0));

    const mu = expectations
      .map(expectation => expectation.completionTime)
      .reduce((a, b) => a + b, 0);

    return {
      completionTime: mu,
      standardDeviation: sigma,
      taskName
    }
  }
}
