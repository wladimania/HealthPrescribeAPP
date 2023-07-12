import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GenerarRecetaPage } from './generar-receta.page';

describe('GenerarRecetaPage', () => {
  let component: GenerarRecetaPage;
  let fixture: ComponentFixture<GenerarRecetaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(GenerarRecetaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
