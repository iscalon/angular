import { Component } from '@angular/core';
import { MediatorService } from '../services/mediator.service';
import { FormArray, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatIconModule, MatFormFieldModule, MatInputModule, MatButtonModule, CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {

  form = this.formBuilder.group({
    ingredients: this.formBuilder.array([])
  });

  constructor(private readonly mediator: MediatorService, private readonly formBuilder: FormBuilder) { }

  search() {
    const ingredients = this.form.value.ingredients?.filter(_ => !!_)
      .map(_ => (_ as { name: string }).name)
      .filter(_ => !!_);

    this.mediator.updateIngredients(ingredients);
  }

  get ingredients() {
    return this.form.get('ingredients') as FormArray;
  }

  addIngredient() {
    const ingredientForm = this.formBuilder.group({
      name: [''],
    });

    this.ingredients.push(ingredientForm);
  }

  deleteIngredient(index: number) {
    this.ingredients.removeAt(index);
  }
}
