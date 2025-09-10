import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  imports: [],
  template: `
    <div class="loading-container">
      @if (loading) {
        <div class="blocker">spinner</div>
      }
      @else {
        <ng-content></ng-content>
      }
    </div>
  `,
  styles: `
    .loading-container {
      position: relative;
    }
    .blocker {
      background-color: black;
      position: absolute;
      top: 0;
      z-index: 9999;
      width: 100%;
      height: 100%;
      opacity: 0.4;
    }
  `,
})
export class Loader {
  @Input() loading = false;
}
