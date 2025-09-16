import { Injectable } from '@angular/core';
import { delay, EMPTY, Observable, of } from 'rxjs';
import { Project } from '../infrastructure/types/project';

@Injectable()
export class ProjectService {
  readonly projects: Project[] = [
    {
      id: 0,
      name: 'HRMS',
      image: 'https://images.pexels.com/photos/30374294/pexels-photo-30374294.jpeg',
    },
    {
      id: 1,
      name: 'X10',
      image: 'https://images.pexels.com/photos/14118599/pexels-photo-14118599.jpeg',
    },
    {
      id: 2,
      name: 'Ruseng',
      image: 'https://images.pexels.com/photos/27784983/pexels-photo-27784983.jpeg',
    },
    {
      id: 3,
      name: 'SMSE',
      image: 'https://images.pexels.com/photos/29498850/pexels-photo-29498850.jpeg',
    },
  ];

  getProject$(projectId: number): Observable<Project> {
    const project = this.projects.find((p) => p.id === projectId);
    if (!project) {
      return EMPTY;
    }
    return of(project).pipe(delay(500));
  }

  getProjectsByName$(name: string): Observable<Project[]> {
    const project = this.projects.filter((p) => new RegExp(name, 'i').test(p.name));
    if (!project) {
      return EMPTY;
    }
    return of(project).pipe(delay(100));
  }

  getProjects$(): Observable<Project[]> {
    return of(this.projects);
  }
}
