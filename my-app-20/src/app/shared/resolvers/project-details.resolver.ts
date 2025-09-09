import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { Project } from '../../infrastructure/types/project';
import { ProjectService } from '../../services/project-service';

export const projectDetailsResolver: ResolveFn<Project> = (route: ActivatedRouteSnapshot) => {
  const projectService = inject(ProjectService);
  const id = +(route.paramMap.get('id') ?? -1);

  return projectService.getProject$(id);
};
