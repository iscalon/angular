import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize, tap } from 'rxjs';
import { Cocktail } from '../model/cocktail';
import { CocktailServiceInterface } from './cocktail-service-interface';

@Injectable({
    providedIn: 'root',
})
export class MediatorService {

    private cocktails$ = new BehaviorSubject<Cocktail[]>([]);
    currentCocktails$ = this.cocktails$.asObservable();
    isLoading = false;

    constructor(private readonly cocktailService: CocktailServiceInterface) { }

    updateIngredients(ingredients?: string[]): void {
        this.isLoading = true;
        this.cocktails$.next([]);
        if(!ingredients || ingredients.length <= 0) {
            this.isLoading = false;
            return;
        }
        this.cocktailService.findCocktailsByIngredients(ingredients)
            .pipe(
                finalize(() => this.isLoading = false)
            )
            .subscribe(cocktails => {
                this.cocktails$.next(cocktails);
            });
    }
}