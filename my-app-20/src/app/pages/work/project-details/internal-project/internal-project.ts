import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-internal-project',
  imports: [],
  template: `
    <p>
      internal-project works! Project : {{ projectId }}
    </p>
  `,
  styles: ``
})
export class InternalProject {

  @Input({required: true}) projectId!: number;

}
