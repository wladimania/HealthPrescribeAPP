import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarMedicamentoPage } from './editar-medicamento.page';

describe('EditarMedicamentoPage', () => {
  let component: EditarMedicamentoPage;
  let fixture: ComponentFixture<EditarMedicamentoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EditarMedicamentoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
