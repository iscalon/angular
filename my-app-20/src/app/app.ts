import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from "./shared/components/footer/footer";
import { Constants } from './shared/constants';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  
  private readonly constants = inject(Constants);

  protected readonly title = signal('my-app-20');


  sayHello(): string {
    return `Hello ${this.constants.dateFormat}`;
  }
}
