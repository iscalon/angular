import { Observable } from "rxjs";
import { Cocktail } from "../model/cocktail";

export abstract class CocktailServiceInterface {

    abstract findCocktailById(id: string): Observable<Cocktail>;

    abstract findCocktailsByIngredients(ingredients: string[]): Observable<Cocktail[]>;
}