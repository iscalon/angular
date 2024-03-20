export interface Cocktail {
    id: string,
    name: string,
    thumbUrl: string,
    instructions: string,
    ingredients: string[],
    quantities: (string | null)[]
}