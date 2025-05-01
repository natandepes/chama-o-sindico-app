import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../../services/reservation.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-area-form',
  standalone: false,
  templateUrl: './area-form.component.html',
  styleUrl: './area-form.component.css',
})
export class AreaFormComponent implements OnInit {

  formulario!: FormGroup;
  areaId!: number;

  constructor(
    private areaReservationService: ReservationService,
    private route: ActivatedRoute,
  ) {
    this.formulario = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      capacity: new FormControl('', Validators.required),
      status: new FormControl(true),
      openTime: new FormControl('', Validators.required),
      closeTime: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];

    if (id) {
      this.areaId = id;
      this.getArea(id);
    }
  }

  getArea(id: number) {
    this.areaReservationService.getArea(id).subscribe(data => {
      console.log('Area details:', data);
    });
  }

  formatTimeToDate(time: string): Date {
    const [hours, minutes] = time.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0); // Set hours and minutes
    return date;
  }

  createArea() {
    const area = this.areaId ? 
      {
        id: this.areaId, 
        ...this.formulario.value!,
        openTime: this.formatTimeToDate(this.formulario.get('openTime')?.value), 
        closeTime: this.formatTimeToDate(this.formulario.get('closeTime')?.value),
      } : 
      {
        ...this.formulario.value!,
        openTime: this.formatTimeToDate(this.formulario.get('openTime')?.value), 
        closeTime: this.formatTimeToDate(this.formulario.get('closeTime')?.value),
      }

    this.areaReservationService.SaveArea(area).subscribe(() => {
      alert('Area created:' + area.name);
    });
  }
}
