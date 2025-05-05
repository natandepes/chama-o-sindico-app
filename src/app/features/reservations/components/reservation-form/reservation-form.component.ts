import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../../services/reservation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AreaReservation } from '../../models/area-reservation.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Area } from '../../models/area.model';

@Component({
  selector: 'app-reservation-form',
  standalone: false,
  templateUrl: './reservation-form.component.html',
  styleUrl: './reservation-form.component.css',
})
export class ReservationFormComponent implements OnInit {

  formulario!: FormGroup; // Define the type of formulario based on your form structure
  areaReservations!: AreaReservation; // Define the type of areaReservations based on your model
  areas: Area[] = []; // Define the type of areas based on your model	
  userId!: string; // Replace with actual user ID logic
  areaReservationId!: string; // Define the type of areaReservationId based on your model

  constructor(
    private areaReservationService: ReservationService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.initForm();
  }
  // Define any properties or methods needed for the component here
  ngOnInit() {
    this.getAreas();
    this.userId = localStorage.getItem('userId')!;
    this.areaReservationId = this.route.snapshot.paramMap.get('id')!;

    if (this.areaReservationId) {
      this.getAreaReservation(this.areaReservationId);
    }
  }

  getAreaReservation(id: string) {
    this.areaReservationService.getAreaReservation(id).subscribe((data) => {
      this.areaReservations = data.data!;
      this.getFormValues();
    });
  }

  getAreas(){
    this.areaReservationService.getAreas().subscribe((data) => {
      this.areas = data.data ?? [] as Area[];
    });
  }

  calculateLengthTime(type: string): string {
    if(type === 'start'){
      return this.areas.filter(area => area.id === this.formulario.value.areaId)[0].openTime;
    }
    
    return this.areas.filter(area => area.id === this.formulario.value.areaId)[0].closeTime;
  }

  initForm() {
    this.formulario = new FormGroup({
      areaId: new FormControl('', Validators.required),
      createdByUserId: new FormControl('', Validators.required),
      date: new FormControl(new Date(), Validators.required),
      startTime: new FormControl('', Validators.required),
      endTime: new FormControl('', Validators.required),
    });
  }

  getFormValues(){
    this.formulario.get('areaId')?.setValue(this.areaReservations.areaId);
    this.formulario.get('status')?.setValue(this.areaReservations.status);
    this.formulario.get('date')?.setValue(this.extractDate(this.areaReservations.endDate));
    this.formulario.get('startTime')?.setValue(this.extractTime(this.areaReservations.startDate));
    this.formulario.get('endTime')?.setValue(this.extractTime(this.areaReservations.endDate));
  }

  private extractDate(dateTime: Date | string): string {
    const dt = new Date(dateTime);
    return dt.toISOString().split('T')[0];
  }

  private extractTime(dateTime: Date | string): string {
    const dt = new Date(dateTime);
    const hh = String(dt.getHours()).padStart(2, '0');
    const mm = String(dt.getMinutes()).padStart(2, '0');
    return `${hh}:${mm}`;
  }

  private combineDateAndTime(date: Date, time: string): Date {
    const [hours, minutes] = time.split(':').map(Number);
    
    const dt = new Date(date);
    dt.setHours(hours, minutes, 0, 0);
    return dt;
  }

  saveAreaReservation() {
    if(this.formulario.valid){
      const reservationData: AreaReservation = {
        areaId: this.formulario.value.areaId,
        areaName: this.areas.find(area => area.id === this.formulario.value.areaId)?.name ?? '',
        createdByUserId: this.userId,
        startDate: this.combineDateAndTime(this.formulario.value.date, this.formulario.value.startTime),
        endDate: this.combineDateAndTime(this.formulario.value.date, this.formulario.value.endTime),
        status: "WaitingApproval",
      };
  
      if (this.areaReservationId) {
        reservationData.id = this.areaReservationId;
      }
  
      this.areaReservationService.saveAreaReservation(reservationData).subscribe(
        () => {
          this.router.navigate(['/reservations/view']);
        },
        error => {
          console.error('Error creating reservation:', error);
        },
      );
    }
    else {
      alert('Preencha todos os campos obrigatórios !');
    }
  }
}
