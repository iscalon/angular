import { Observable, catchError, filter, first, forkJoin, map, of, switchMap, take } from "rxjs";
import { Cocktail } from "../model/cocktail";
import { CocktailServiceInterface } from "./cocktail-service-interface";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root',
})
export class CocktailService implements CocktailServiceInterface {

    private readonly MAX_COCKTAILS: number = 10;

    constructor(private readonly http: HttpClient) { }

    findCocktailById(id: string): Observable<Cocktail> {
        return this.http.get<CocktailDbs>(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
            .pipe(
                map(dbs => dbs.drinks),
                filter(drinks => drinks.length > 0),
                map(drinks => drinks[0]),
                map(drink => this.convertCocktailDbToCocktail(drink))
            );
    }

    findCocktailsByIngredients(ingredients: string[]): Observable<Cocktail[]> {
        const cocktailsByIngredients: Observable<Cocktail[] | null>[] = ingredients
            .map(ingredient => this.http.get<CocktailDbs>(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`)
                .pipe(
                    map(dbs => dbs.drinks),
                    map(cocktails => cocktails.map((c: CocktailDb) => this.convertCocktailDbToCocktail(c))),
                    catchError(error => of(null)),
                ));

        const cocktailIds: Observable<string[]> = forkJoin(cocktailsByIngredients).pipe(
            map(a => a.filter(_ => !!_) as Cocktail[][]),
            map(cocktails => this.findCommonsCocktails(cocktails)),
            map(cocktails => cocktails.map(cocktail => cocktail.id))
        );

        return cocktailIds.pipe(
            map(ids => ids.slice(0, this.MAX_COCKTAILS)),
            switchMap(ids => {
                return forkJoin(ids.map(id => this.findCocktailById(id)));
            })
        );
    }

    private findCommonsCocktails(cocktails: Cocktail[][]): Cocktail[] {
        const allCocktails = cocktails.flat();

        const cocktailCounts = allCocktails.reduce((acc, cocktail) => {
            if (!acc[cocktail.id]) {
                acc[cocktail.id] = { count: 1, cocktail: cocktail };
            } else {
                acc[cocktail.id].count++;
            }
            return acc;
        }, {} as { [id: string]: { count: number, cocktail: Cocktail } });

        return Object.values(cocktailCounts)
            .filter(({ count }) => count === cocktails.length)
            .map(({ cocktail }) => cocktail);
    }

    private convertCocktailDbToCocktail(cocktailDb: CocktailDb): Cocktail {
        const ingredients = [
            cocktailDb.strIngredient1,
            cocktailDb.strIngredient2,
            cocktailDb.strIngredient3,
            cocktailDb.strIngredient4,
            cocktailDb.strIngredient5,
            cocktailDb.strIngredient6,
            cocktailDb.strIngredient7,
            cocktailDb.strIngredient8,
            cocktailDb.strIngredient9,
            cocktailDb.strIngredient10,
            cocktailDb.strIngredient11,
            cocktailDb.strIngredient12,
            cocktailDb.strIngredient13,
            cocktailDb.strIngredient14,
            cocktailDb.strIngredient15
        ].filter(i => !!i);

        const quantities = [
            cocktailDb.strMeasure1,
            cocktailDb.strMeasure2,
            cocktailDb.strMeasure3,
            cocktailDb.strMeasure4,
            cocktailDb.strMeasure5,
            cocktailDb.strMeasure6,
            cocktailDb.strMeasure7,
            cocktailDb.strMeasure8,
            cocktailDb.strMeasure9,
            cocktailDb.strMeasure10,
            cocktailDb.strMeasure11,
            cocktailDb.strMeasure12,
            cocktailDb.strMeasure13,
            cocktailDb.strMeasure14,
            cocktailDb.strMeasure15
        ].slice(0, ingredients.length);

        return {
            id: cocktailDb.idDrink,
            name: cocktailDb.strDrink,
            thumbUrl: cocktailDb.strDrinkThumb,
            instructions: cocktailDb.strInstructions ?? '',
            ingredients,
            quantities
        } as Cocktail;
    }
}

interface CocktailDbs {
    drinks: CocktailDb[]
}

interface CocktailDb {
    idDrink: string,
    strDrink: string,
    strDrinkThumb: string,
    strInstructions: string | null,
    strIngredient1: string | null,
    strIngredient2: string | null,
    strIngredient3: string | null,
    strIngredient4: string | null,
    strIngredient5: string | null,
    strIngredient6: string | null,
    strIngredient7: string | null,
    strIngredient8: string | null,
    strIngredient9: string | null,
    strIngredient10: string | null,
    strIngredient11: string | null,
    strIngredient12: string | null,
    strIngredient13: string | null,
    strIngredient14: string | null,
    strIngredient15: string | null,
    strMeasure1: string | null,
    strMeasure2: string | null,
    strMeasure3: string | null,
    strMeasure4: string | null,
    strMeasure5: string | null,
    strMeasure6: string | null,
    strMeasure7: string | null,
    strMeasure8: string | null,
    strMeasure9: string | null,
    strMeasure10: string | null,
    strMeasure11: string | null,
    strMeasure12: string | null,
    strMeasure13: string | null,
    strMeasure14: string | null,
    strMeasure15: string | null
}
