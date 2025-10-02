import { RenderResult, render, screen } from '@testing-library/angular';
import { ProjectCardComponent } from './project-card';
import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { MockDirective, MockProvider } from 'ng-mocks';
import { ProjectService } from '../../../services/project-service';
import { Project } from '../../../infrastructure/types/project';
import { of } from 'rxjs';

const mockProjects: Project[] = [
  {
    id: 1,
    name: 'Project 1',
    image: 'path-to-image1.png',
  },
  {
    id: 2,
    name: 'Project 2',
    image: 'path-to-image2.png',
  },
];

describe('ProjectCard', () => {
  let component: RenderResult<ProjectCardComponent>;

  beforeEach(async () => {
    component = await render(ProjectCardComponent, {
      imports: [AsyncPipe, MockDirective(NgOptimizedImage)],
      providers: [
        MockProvider(ProjectService, {
          getProject$(projectId) {
            return of(mockProjects.find((project) => project.id === projectId)!);
          },
        }),
      ],
      inputs: {
        projectId: 1,
      },
    });
  });

  it('should render the project name', () => {
    expect(screen.getByText('Project 1')).toBeTruthy();
    component.fixture.componentRef.setInput('projectId', 2);
    component.fixture.detectChanges();
    expect(screen.getByText('Project 2')).toBeTruthy();
  });
});
