import { Expectations, TaskCompletionProbabilities } from "../model/task-completion-probabilities";

export abstract class ExpectationService {

    abstract compute(tasks: TaskCompletionProbabilities[]): Expectations | undefined;
}