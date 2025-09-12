import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-external-project',
  imports: [],
  template: `
    <p>
      external-project works! Project : {{ projectId }}
    </p>
  `,
  styles: ``
})
export class ExternalProject {

  @Input({required: true}) projectId!: number;
}
