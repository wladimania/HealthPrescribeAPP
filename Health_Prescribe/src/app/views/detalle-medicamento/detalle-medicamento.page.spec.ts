import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleMedicamentoPage } from './detalle-medicamento.page';

describe('DetalleMedicamentoPage', () => {
  let component: DetalleMedicamentoPage;
  let fixture: ComponentFixture<DetalleMedicamentoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DetalleMedicamentoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
