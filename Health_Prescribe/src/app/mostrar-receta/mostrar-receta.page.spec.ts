import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MostrarRecetaPage } from './mostrar-receta.page';

describe('MostrarRecetaPage', () => {
  let component: MostrarRecetaPage;
  let fixture: ComponentFixture<MostrarRecetaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MostrarRecetaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
