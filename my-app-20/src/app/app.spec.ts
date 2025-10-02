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
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('Hello');
  });

  it('should render header, footer and a router outlet', () => {
    const fixture = TestBed.createComponent(App);

    fixture.detectChanges();
    const header = fixture.debugElement.query(By.css('app-header'));
    expect(header).toBeTruthy();
    const footer = fixture.debugElement.query(By.css('app-footer'));
    expect(footer).toBeTruthy();
    const routerOutlet = fixture.debugElement.query(By.css('router-outlet'));
    expect(routerOutlet).toBeTruthy();
  });
});
