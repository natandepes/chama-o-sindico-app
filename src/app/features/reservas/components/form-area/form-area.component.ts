import { Component, OnInit } from '@angular/core';
import { AreaReservationService } from '../../services/area-reservation.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form-area',
  standalone: false,
  templateUrl: './form-area.component.html',
  styleUrl: './form-area.component.css'
})
export class FormAreaComponent implements OnInit {
  

  constructor(private areaReservationService: AreaReservationService, private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];

    if (id) {
      this.getArea(id);
    } 
  }

  getArea(id: number) {
    this.areaReservationService.getArea(id).subscribe((data) => {
      console.log('Area details:', data);
    });
  }

  createArea() {
    const area = {
      id: 0,
      name: 'Area 1',
      description: 'Description of Area 1',
      location: 'Location of Area 1',
      capacity: 10,
      price: 100,
      status: 'Available'
    };

    this.areaReservationService.SaveArea(area).subscribe((data) => {
      console.log('Area created:', data);
    });
  }
}
