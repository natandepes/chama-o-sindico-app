import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../../services/reservation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Area } from '../../models/area.model';

@Component({
  selector: 'app-area-form',
  standalone: false,
  templateUrl: './area-form.component.html',
  styleUrl: './area-form.component.css',
})
export class AreaFormComponent implements OnInit {

  formulario!: FormGroup;
  area!: Area;
  areaId!: string;

  constructor(
    private areaReservationService: ReservationService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.initForm();
  }

  ngOnInit() {
    const id = this.route.snapshot.params['id'] as string;

    if (id) {
      this.areaId = id;
      this.getArea(id);
    }
  }

  initForm(){
    this.formulario = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      capacity: new FormControl('', Validators.required),
      status: new FormControl(true),
      openTime: new FormControl('', Validators.required),
      closeTime: new FormControl('', Validators.required),
    });
  }

  getArea(id: string) {
    this.areaReservationService.getArea(id).subscribe(data => {
      this.area = data.data!;
      this.setFormValues();
    });
  }

  setFormValues() {
    this.formulario.patchValue({
      name: this.area.name,
      description: this.area.description,
      capacity: this.area.capacity,
      status: this.area.status,
      openTime: this.area.openTime,
      closeTime: this.area.closeTime,
    });
  }

  formatTime(time: string): string {
    const parts = time.split(':');

    if(parts.length < 2){
      return time + ':00'; 
    }
    
    return time.padEnd(5, ':00');
  }

  saveArea() {
    if(this.formulario.valid){
      const area = this.areaId ? 
        {
          id: this.areaId, 
          ...this.formulario.value!,
          openTime: this.formatTime(this.formulario.get('openTime')?.value), 
          closeTime: this.formatTime(this.formulario.get('closeTime')?.value),
        } : 
        {
          ...this.formulario.value!,
          openTime: this.formatTime(this.formulario.get('openTime')?.value), 
          closeTime: this.formatTime(this.formulario.get('closeTime')?.value),
        }

      this.areaReservationService.saveArea(area).subscribe({
        next: (data) => {
          if (data.success) {
            this.router.navigate(['/areas/view']);
          } else {
            console.error(data.message);
          }
        },
        error: (error) => {
          console.error(error);
        },
      });
    }
    else{
      alert("Preencha todos os campos obrigatórios !")
    }
  }
}
