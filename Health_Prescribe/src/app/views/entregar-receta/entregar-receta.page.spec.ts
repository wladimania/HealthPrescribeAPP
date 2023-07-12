import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EntregarRecetaPage } from './entregar-receta.page';

describe('EntregarRecetaPage', () => {
  let component: EntregarRecetaPage;
  let fixture: ComponentFixture<EntregarRecetaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EntregarRecetaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
