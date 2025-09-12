import {
  Component,
  inject,
  Input,
  numberAttribute,
  OnChanges,
  SimpleChanges,
  Type,
} from '@angular/core';
import { map, Observable } from 'rxjs';
import { Project } from '../../../infrastructure/types/project';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe, NgComponentOutlet } from '@angular/common';
import { InternalProject } from './internal-project/internal-project';
import { ExternalProject } from './external-project/external-project';

@Component({
  selector: 'app-project-details',
  imports: [AsyncPipe, NgComponentOutlet],
  template: `
    <div>
      @if (project$ | async; as project) {
      <table>
        <tr>
          <td>Projet ID :</td>
          <td>{{ id }}</td>
        </tr>
        <tr>
          <td>Projet name :</td>
          <td>{{ project.name }}</td>
        </tr>
        <tr>
          <td>Projet image source :</td>
          <td><a href="{{ project.image }}">click</a></td>
        </tr>
      </table>
      }
    </div>
    <ng-container *ngComponentOutlet="typeSection; inputs: {projectId: id}" />
  `,
  styles: ``,
})
export class ProjectDetails implements OnChanges {
  @Input({ transform: numberAttribute }) id!: number;
  typeSection: Type<unknown> | null = null;

  project$: Observable<Project> = inject(ActivatedRoute).data.pipe(map((data) => data['project']));

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['id']) {
      return;
    }
    this.typeSection = this.selectTypeSectionComponent();
  }

  private selectTypeSectionComponent(): Type<unknown> {
    switch (this.id % 2) {
      case 0:
        return InternalProject;
      default:
        return ExternalProject;
    }
  }
}
