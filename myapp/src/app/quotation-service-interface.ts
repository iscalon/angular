import { Observable } from "rxjs"

export abstract class QuotationServiceInterface {

    abstract getQuotations(): Observable<Quotation[]>

    abstract getQuotation(name?: string): Observable<Quotation | undefined>
}

export interface Quotation {
    name: string,
    value: number
}