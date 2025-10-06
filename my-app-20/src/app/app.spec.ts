import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { MockComponents } from 'ng-mocks';
import { Header } from './shared/components/header/header';
import { Footer } from './shared/components/footer/footer';
import { By } from '@angular/platform-browser';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App, MockComponents(Header, Footer)],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App); // fixture est l'objet central pour piloter le composant en test.
                                                  // On l'utilise pour déclencher la détection de changements pour
                                                  // refléter une modification faite dans le DOM :
                                                  // fixture.detectChanges();
                                                  // Ou on peut aussi s'en servir pour attendre que toutes les tâches async
                                                  // soient terminées avant de continuer :
                                                  // fixture.whenStable();

    const app = fixture.componentInstance;  // Instance typescript du composant testé (~ new App())
                                            // On s'en sert souvent pour manipuler l'initialisation de valeurs :
                                            // fixture.componentInstance.title = 'titre';
                                            // ou pour vérifier l'état interne du composant
                                            // ou déclencher une logique métier :
                                            // fixture.componentInstance.maMethode();
    expect(app).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement; // Elément DOM racine natif (<div>, <span>, <my-app> etc...)
                                                           // qui encapsule le template.
                                                           // On peut utiliser les API du navigateur dessus :
                                                           // compiled.querySelector('button')?.click();
    expect(compiled.querySelector('.content span')?.textContent).toContain('Hello');
  });

  it('should render header, footer and a router outlet', () => {
    const fixture = TestBed.createComponent(App);

    fixture.detectChanges();
    const header = fixture.debugElement.query(By.css('app-header'));
    // Le debugElement offre des méthodes adaptées aux mécanismes internes :
    // fixture.debugElement.query(By.css('button'))?.triggerEventHandler('click', null);
    // On peut aussi récupérer des instances de directives : 
    // fixture.debugElement.query(By.css('button'))?.injector?.get(MaDirective);
    expect(header).toBeTruthy();
    const footer = fixture.debugElement.query(By.css('app-footer'));
    expect(footer).toBeTruthy();
    const routerOutlet = fixture.debugElement.query(By.css('router-outlet'));
    expect(routerOutlet).toBeTruthy();

    // fixture.componentRef est quant à lui la référence complète retournée par Angular
    // quand il crée le composant.
    // Elle contient :
    //   - l'injector
    //   - la location dans le DOM
    //   - le hostView etc...
    // On s'en sert assez rarement, mais on peut donc faire
    // de l'injection manuelle, des vues dynamiques, destruction etc...
    // Ex : component.fixture.componentRef.setInput('projectId', 2);
  });
});
