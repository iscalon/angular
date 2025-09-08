import { Directive, inject, ElementRef, Input, AfterViewInit, InjectionToken } from '@angular/core';

@Directive({
  selector: '[appTruncate]',
  standalone: true,
})
export class TruncateDirective implements AfterViewInit {
  static readonly defaultTruncate = 80;

  @Input() limit =
    inject(
      Limits,
      { optional: true } // Permet de fournir une valeur par défaut si l'élément à injecter n'est pas trouvé
    )?.truncate ?? TruncateDirective.defaultTruncate;

  private readonly elementRef = inject(ElementRef);

  ngAfterViewInit(): void {
    const texte: string = this.elementRef.nativeElement.textContent;
    console.log(`Découpage du texte '${texte}' sur ${this.limit} caractère(s)`);
    this.elementRef.nativeElement.textContent = texte.slice(0, this.limit);
  }
}

export const Limits = new InjectionToken<{
  truncate: number;
}>('Limits');
