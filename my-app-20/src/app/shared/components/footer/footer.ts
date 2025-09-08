import { Component } from '@angular/core';
import { isAuthenticated$ } from '../../../services/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  imports: [CommonModule],
  template: `
    <div>
      <h2>HRMS</h2>
      <p>Welcome to HR platform!</p>
      <div class="links">
        Follow us on social media:
        <a href="https://linkedin.com" target="_blank">Linkedin</a>
        <a href="https://x.com" target="_blank">X (former Twitter)</a>
      </div>
      @if (!(isAuthenticated$ | async)) {
        <div class="legal">
          <a routerLink="/terms">Terms of Service</a>
          <a routerLink="/privacy">Privacy Policy</a>
          <a routerLink="/cookies">Cookies Policy</a>
        </div>
      }
    </div>
  `,
  styles: ``,
})
export class Footer {

  isAuthenticated$ = isAuthenticated$();

}
