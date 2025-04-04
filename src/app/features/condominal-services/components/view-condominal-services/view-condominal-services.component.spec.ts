import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { ViewCondominalServicesComponent } from './view-condominal-services.component';

describe('ViewCondominalServicesComponent', () => {
  let component: ViewCondominalServicesComponent;
  let fixture: ComponentFixture<ViewCondominalServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewCondominalServicesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCondominalServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
