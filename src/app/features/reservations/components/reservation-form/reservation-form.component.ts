import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../../services/reservation.service';
import { ActivatedRoute } from '@angular/router';
import { AreaReservation } from '../../models/area-reservation.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reservation-form',
  standalone: false,
  templateUrl: './reservation-form.component.html',
  styleUrl: './reservation-form.component.css',
})
export class ReservationFormComponent implements OnInit {

  formulario!: FormGroup; // Define the type of formulario based on your form structure
  areaReservations!: AreaReservation; // Define the type of areaReservations based on your model

  constructor(
    private areaReservationService: ReservationService,
    private route: ActivatedRoute,
  ) {}
  // Define any properties or methods needed for the component here
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.getAreaReservation(id);
    }
  }

  getAreaReservation(id: string) {
    this.areaReservationService.getAreaReservation(id).subscribe((data) => {
      this.areaReservations = data.data!;
      this.getFormValues();
    });
  }

  initForm() {
    this.formulario = new FormGroup({
      areaId: new FormControl('', Validators.required),
      createdByUserId: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
      startDate: new FormControl(new Date(), Validators.required),
      endDate: new FormControl(new Date(), Validators.required),
    });
  }

  getFormValues(){
    this.formulario.get('areaId')?.setValue(this.areaReservations.areaId);
    this.formulario.get('createdByUserId')?.setValue(this.areaReservations.createdByUserId);
    this.formulario.get('status')?.setValue(this.areaReservations.status);
    this.formulario.get('startDate')?.setValue(this.areaReservations.startDate);
    this.formulario.get('endDate')?.setValue(this.areaReservations.endDate);
  }

  createAreaReservation() {
    const reservationData = {
      ...this.formulario.value!
    };

    this.areaReservationService.saveAreaReservation(reservationData).subscribe(
      response => {
        console.log('Reservation created successfully:', response);
      },
      error => {
        console.error('Error creating reservation:', error);
      },
    );
  }
}
