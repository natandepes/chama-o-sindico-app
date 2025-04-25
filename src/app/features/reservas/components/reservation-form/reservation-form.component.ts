import { Component, OnInit } from '@angular/core';
import { AreaReservationService } from '../../services/area-reservation.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reservation-form',
  standalone: false,
  templateUrl: './reservation-form.component.html',
  styleUrl: './reservation-form.component.css'
})
export class ReservationFormComponent implements OnInit {

  constructor(private areaReservationService: AreaReservationService, private route: ActivatedRoute) { }
  // Define any properties or methods needed for the component here
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id) {
      this.getAreaReservation(Number(id));
    }
  }

  getAreaReservation(id: number) {
    this.areaReservationService.getAreaReservation(id).subscribe((data: object[]) => {
      console.log(data);
    });
  }

  createAreaReservation() {
    const reservationData = {
      // Populate with the necessary data for the reservation
      areaId: 1, // Example area ID
      userId: 1, // Example user ID
      startDate: new Date(), // Example start date
      endDate: new Date(), // Example end date
    };

    this.areaReservationService.saveAreaReservation(reservationData).subscribe(response => {
      console.log('Reservation created successfully:', response);
    }, error => {
      console.error('Error creating reservation:', error);
    });
  }

}
