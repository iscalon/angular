import { Component, inject, OnInit } from '@angular/core';
import { ProjectCardComponent } from '../../../shared/components/project-card/project-card';
import { ProjectService } from '../../../services/project-service';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, ɵInternalFormsSharedModule, ReactiveFormsModule } from '@angular/forms';
import { createSearch } from '../../../shared/functions/create-search';

@Component({
  selector: 'app-project-list',
  imports: [ProjectCardComponent, AsyncPipe, ɵInternalFormsSharedModule, ReactiveFormsModule],
  template: `
    <div>
      <form>
        <span>Project name : </span><input type="search" [formControl]=searchControl />
      </form>
    </div>
    <div class="row">
      @for (project of projects$ | async; track $index) {
      <app-project-card [projectId]="project.id" (click)="navigateToDetails(project.id)" />
      }
    </div>
  `,
  styles: ``,
})
export class ProjectList implements OnInit {
  private readonly projectService = inject(ProjectService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  searchControl = new FormControl('');
  search$ = createSearch(this.searchControl);

  projects$ = this.projectService.getProjects$();

  ngOnInit(): void {
    this.initProjectSearch();
  }

  private initProjectSearch() {
    this.search$.subscribe((value) => {
      if (!value) {
        this.projects$ = this.projectService.getProjects$();
        return;
      }
      this.projects$ = this.projectService.getProjectsByName$(value);
    });
  }

  navigateToDetails(projectId: number): void {
    this.router.navigate(['./', projectId], { relativeTo: this.route });
  }
}
