import { AsyncPipe } from '@angular/common';
import { Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../../../infrastructure/types/project';
import { ProjectService } from '../../../services/project-service';

@Component({
  selector: 'app-project-card',
  template: `
    @if(project$ | async; as project) {
      <div class="card">
        <img [src]="project.image" width="5%" height="5%" />
        <div class="card-body">
          <h3>{{ project.name }}</h3>
        </div>
      </div>
    }
  `,
  imports: [AsyncPipe]
})
export class ProjectCardComponent implements OnChanges {

  private readonly projectService = inject(ProjectService);

  @Input({required: true}) projectId!: number;

  project$: Observable<Project> | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['projectId']) {
      this.project$ = this.projectService.getProject$(this.projectId);
    }
  }
}
