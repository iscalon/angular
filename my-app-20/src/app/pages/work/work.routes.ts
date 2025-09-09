import { Routes } from '@angular/router';
import { ProjectList } from './project-list/project-list';
import { ProjectDetails } from './project-details/project-details';
import { projectDetailsResolver } from '../../shared/resolvers/project-details.resolver';

export const routes: Routes = [
  { path: 'projects', component: ProjectList },
  {
    path: 'projects/:id',
    component: ProjectDetails,
    resolve: { project: projectDetailsResolver },
  }
];
