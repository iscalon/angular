import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
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
  styles: ``
})
export class Login {
  private readonly authService = inject(Auth);

  credentialsForm = new FormGroup<CredentialsForm>({
    email: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  submit() {
    if (this.credentialsForm.valid) {
      const credentials = this.credentialsForm.value as { email: string; password: string };
      this.authService.login(credentials).subscribe();
    }
  }
}

type CredentialsForm = {
  email: FormControl<string>;
  password: FormControl<string>;
};
