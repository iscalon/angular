import { Component, inject, Input, numberAttribute } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Project } from '../../../infrastructure/types/project';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-project-details',
  imports: [AsyncPipe],
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
  `,
  styles: ``,
})
export class ProjectDetails {

  @Input({transform: numberAttribute}) id!: number;

  project$: Observable<Project> = inject(ActivatedRoute).data.pipe(map((data) => data['project']));
}
