export interface TaskCompletionProbabilities {
    taskName?: string,
    bestTime: number,
    averageTime: number,
    worstTime: number
}

export interface Expectation {
    taskName?: string,
    completionTime: number,
    standardDeviation: number,
    task?: TaskCompletionProbabilities
}

export interface Expectations {
    tasksExpectations: Expectation[],
    globalExpectation: Expectation
}