import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SearchComponent } from '../search/search.component';
import { DisplayComponent } from '../display/display.component';

@Component({
  selector: 'app-cocktails',
  standalone: true,
  imports: [CommonModule, SearchComponent, DisplayComponent],
  templateUrl: './cocktails.component.html',
  styleUrl: './cocktails.component.css'
})
export class CocktailsComponent {

}
