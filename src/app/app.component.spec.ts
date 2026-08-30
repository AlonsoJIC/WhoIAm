import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';
import { PROJECTS } from './models/projects.model';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Portafolio'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Portafolio');
  });

  it('should include the five requested client works with public URLs only where available', () => {
    const clientWorks = PROJECTS.filter(project => project.category === 'professional-client').slice(-5);
    const titles = clientWorks.map(project => project.title);

    expect(titles).toEqual([
      'VV Phoenix Ops',
      'Estrategika',
      'SM Consultora',
      'SYSTEC',
      'Constructora DIA S.A.'
    ]);

    expect(clientWorks.find(project => project.title === 'VV Phoenix Ops')?.liveUrl).toBe('https://vvphoenixops.com/');
    expect(clientWorks.find(project => project.title === 'SYSTEC')?.liveUrl).toBe('https://systec.cr/');
    expect(clientWorks.find(project => project.title === 'Estrategika')?.liveUrl).toBeUndefined();
    expect(clientWorks.find(project => project.title === 'SM Consultora')?.liveUrl).toBeUndefined();
    expect(clientWorks.find(project => project.title === 'Constructora DIA S.A.')?.liveUrl).toBeUndefined();
  });

});
