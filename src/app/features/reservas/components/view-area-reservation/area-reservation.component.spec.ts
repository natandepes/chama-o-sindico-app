import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaReservationComponent } from './area-reservation.component';

describe('ReservasComponent', () => {
  let component: AreaReservationComponent;
  let fixture: ComponentFixture<AreaReservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AreaReservationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AreaReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
