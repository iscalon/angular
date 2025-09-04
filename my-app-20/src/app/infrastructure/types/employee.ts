export interface Employee {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    position: Position,
    level: Level,
    isAvailable: boolean,
    profilePicture?: string
}

export type Position = 'Developer' | 'Designer' | 'QA' | 'Manager';

export type Level = 'Junior' | 'Middle' | 'Senior' | 'Lead';