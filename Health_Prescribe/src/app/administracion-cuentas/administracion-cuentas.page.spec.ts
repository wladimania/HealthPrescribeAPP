import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdministracionCuentasPage } from './administracion-cuentas.page';

describe('AdministracionPage', () => {
  let component: AdministracionCuentasPage;
  let fixture: ComponentFixture<AdministracionCuentasPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AdministracionCuentasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
