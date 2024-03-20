import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MediatorService } from '../services/mediator.service';
import { Cocktail } from '../model/cocktail';
import { Observable } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-display',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, MatCardModule, MatButtonModule],
  templateUrl: './display.component.html',
  styleUrl: './display.component.css'
})
export class DisplayComponent implements OnInit {

  constructor(private readonly mediator: MediatorService) { }

  ngOnInit(): void { }

  getCocktails$(): Observable<Cocktail[]> {
    return this.mediator.currentCocktails$;
  }

  isLoading(): boolean {
    return this.mediator.isLoading;
  }
}
