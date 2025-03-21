import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarDenunciaComponent } from './criar-denuncia.component';

describe('CriarDenunciaComponent', () => {
  let component: CriarDenunciaComponent;
  let fixture: ComponentFixture<CriarDenunciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CriarDenunciaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriarDenunciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
