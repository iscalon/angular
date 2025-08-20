import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  template: `
    <div class="login-container">
      <h1>Login</h1>
      <form [formGroup]="credentialsForm" (ngSubmit)="submit()">
        <input type="text" name="email" placeholder="Email" formControlName="email" />
        <input type="password" name="password" placeholder="Password" formControlName="password" />
        <button type="submit" [disabled]="!credentialsForm.valid">Login</button>
      </form>
      @if(!credentialsForm.value.email || !credentialsForm.value.password) {
        <span class="warning"> Please fill in all the required fields </span>
      }
    </div>
  `,
  styles: ``,
  providers: [Auth]
})
export class Login {

  private readonly formBuilder = inject(FormBuilder);
  private readonly authService = inject(Auth);

  credentialsForm = this.formBuilder.nonNullable.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  submit() {
    if (this.credentialsForm.valid) {
      this.authService.login(this.credentialsForm.getRawValue()).subscribe();
    }
  }
}
