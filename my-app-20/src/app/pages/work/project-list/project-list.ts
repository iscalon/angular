import { Component, inject } from '@angular/core';
import { ProjectCardComponent } from '../../../shared/components/project-card/project-card';
import { ProjectService } from '../../../services/project-service';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-project-list',
  imports: [ProjectCardComponent, AsyncPipe],
  template: `
    <div class="row">
      @for (project of projects$ | async; track $index) {
        <app-project-card [projectId]="project.id" (click)="navigateToDetails(project.id)" />
      }
    </div>
  `,
  styles: ``,
})
export class ProjectList {
  private readonly projectService = inject(ProjectService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  projects$ = this.projectService.getProjects$();

  navigateToDetails(projectId: number): void {
    this.router.navigate(['./', projectId], {relativeTo : this.route});
  }
}
