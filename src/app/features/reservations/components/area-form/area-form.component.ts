import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../../services/reservation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Area } from '../../models/area.model';
import { ROUTE_PATHS } from '../../../../app.paths';
import { LoaderService } from '../../../shared/services/loader.service';

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
    private router: Router,
    private loader: LoaderService,
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

  goBack() {
    this.router.navigate([ROUTE_PATHS.viewArea]);
  }

  initForm() {
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
    this.loader.show();
    this.areaReservationService.getArea(id).subscribe(data => {
      this.area = data.data!;
      this.setFormValues();
      this.loader.hide();
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

  private formatTime(time: string): string {
    const date = new Date(`1970-01-01T${time}`);
    return date.toTimeString().split(' ')[0]; // returns "HH:mm:ss"
  }

  saveArea() {
    if (this.formulario.valid) {
      this.loader.show();

      const area = this.areaId
        ? {
            id: this.areaId,
            ...this.formulario.value!,
            openTime: this.formatTime(this.formulario.get('openTime')?.value),
            closeTime: this.formatTime(this.formulario.get('closeTime')?.value),
          }
        : {
            ...this.formulario.value!,
            openTime: this.formatTime(this.formulario.get('openTime')?.value),
            closeTime: this.formatTime(this.formulario.get('closeTime')?.value),
          };

      this.areaReservationService.createArea(area).subscribe({
        next: data => {
          if (data.success) {
            this.loader.hide();
            this.router.navigate(['/areas/view']);
          } else {
            this.loader.hide();
            alert('Erro ao salvar a área, por favor, tente novamente mais tarde.');
          }
        },
      });
    } else {
      alert('Preencha todos os campos obrigatórios !');
    }
  }
}
