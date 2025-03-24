import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarServicoComponent } from './criar-servico.component';

describe('CriarServicoComponent', () => {
  let component: CriarServicoComponent;
  let fixture: ComponentFixture<CriarServicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CriarServicoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriarServicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
