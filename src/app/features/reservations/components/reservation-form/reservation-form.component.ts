import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../../services/reservation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AreaReservation, AreaReservationStatusEnum } from '../../models/area-reservation.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Area } from '../../models/area.model';
import { ROUTE_PATHS } from '../../../../app.paths';
import { AuthService } from '../../../authentication/services/auth.service';
import { UserRole } from '../../../authentication/models/user-roles.model';
import { AreaReservationAnswerModel } from '../../models/area-reservation-answer.model';
import { AreaReservationFullModel } from '../../models/area-reservation-full.model';
import { LoaderService } from '../../../shared/services/loader.service';

@Component({
  selector: 'app-reservation-form',
  standalone: false,
  templateUrl: './reservation-form.component.html',
  styleUrl: './reservation-form.component.css',
})
export class ReservationFormComponent implements OnInit {
  formulario!: FormGroup;
  protected areaReservationAnswerForm!: FormGroup;
  
  areaReservations!: AreaReservationFullModel;
  areas: Area[] = [];
  
  userId!: string;
  areaReservationId!: string;
  
  protected readOnlyMode = false;
  
  protected areaReservationStatusEnum = AreaReservationStatusEnum;
  protected areaReservationStatus!: AreaReservationStatusEnum;

  protected minDate: string = new Date().toISOString().split('T')[0];

  protected userRole: UserRole | null = null;
  protected readonly UserRoleEnum = UserRole;

  constructor(
    private areaReservationService: ReservationService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private loader: LoaderService,
  ) {}
  
  ngOnInit() {
    this.getAreas();
    this.userId = this.authService.getUserId() || '';
    this.userRole = this.authService.getUserRole();
    this.areaReservationId = this.route.snapshot.paramMap.get('id')!;

    this.initForm();

    if (this.areaReservationId) {
      this.getAreaReservation(this.areaReservationId);
      this.formulario.disable();
      this.readOnlyMode = true;
    }
  }

  getAreaReservation(id: string) {
    this.areaReservationService.getAreaReservation(id).subscribe({
      next: (data) => {
        if (data.success && data.data) {
          this.areaReservations = data.data!;
          this.getFormValues();
          this.areaReservationStatus = data.data.status as AreaReservationStatusEnum;
        }
      },
    });
  }

  getAreas(){
    this.loader.show();
    this.areaReservationService.getAreas().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.areas = response.data;
          this.loader.hide();
        }
      }
    })
  }

  calculateLengthTime(type: string): string {
    const selectedAreaId = this.formulario?.get('areaId')?.value;
    const selectedArea = this.areas.find(area => area.id === selectedAreaId);

    if (!selectedArea) return ''; // fallback to blank if not loaded yet

    return type === 'start' ? selectedArea.openTime : selectedArea.closeTime;
  }

  initForm() {
    this.formulario = new FormGroup({
      areaId: new FormControl('', Validators.required),
      createdByUserId: new FormControl(this.userId, Validators.required),
      date: new FormControl(new Date(), Validators.required),
      startTime: new FormControl('', Validators.required),
      endTime: new FormControl('', Validators.required),
      status: new FormControl(''),
    });

    this.areaReservationAnswerForm = new FormGroup({
      answer: new FormControl('', Validators.required),
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
    if (!this.selectedArea?.status) {
      alert("Área não disponível para reserva!");
      return;
    }

    // if the reservation Hora Início and hora Fim are the same, show an alert
    if (this.formulario.value.startTime === this.formulario.value.endTime) {
      alert('Hora de início e hora de fim não podem ser iguais!');
      return;
    }

    // if the reservation Hora Início is greater than hora Fim, show an alert
    if (this.formulario.value.startTime > this.formulario.value.endTime) {
      alert('Hora de início não pode ser maior que hora de fim!');
      return;
    }

    // if the reservation duration is less than 1 hour, show an alert
    const startTime = new Date(this.combineDateAndTime(this.formulario.value.date, this.formulario.value.startTime));
    const endTime = new Date(this.combineDateAndTime(this.formulario.value.date, this.formulario.value.endTime));
    const duration = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60); // in hours
    
    if (duration < 1) {
      alert('A reserva deve ter duração mínima de 1 hora!');
      return;
    }

    // if the reservation Hora Inicio and hora Fim are not between the area open and close time, show an alert
    const areaOpenTime = this.calculateLengthTime('start');
    const areaCloseTime = this.calculateLengthTime('end');
    const areaOpenDate = new Date(this.combineDateAndTime(this.formulario.value.date, areaOpenTime));
    const areaCloseDate = new Date(this.combineDateAndTime(this.formulario.value.date, areaCloseTime));

    if (startTime < areaOpenDate || endTime > areaCloseDate) {
      alert('A reserva deve estar dentro do horário de funcionamento da área!');
      return;
    }

    if(this.formulario.valid){
      if (confirm('Você tem certeza que deseja reservar esta área? Ela não poderá ser editada depois!')) {
        this.loader.show();
        const reservationData: AreaReservation = {
          areaId: this.formulario.value.areaId,
          areaName: this.areas.find(area => area.id === this.formulario.value.areaId)?.name ?? '',
          createdByUserId: this.userId,
          startDate: this.combineDateAndTime(this.formulario.value.date, this.formulario.value.startTime),
          endDate: this.combineDateAndTime(this.formulario.value.date, this.formulario.value.endTime),
          status: this.areaReservationStatusEnum.Pending,
        };
    
        if (this.areaReservationId) {
          reservationData.id = this.areaReservationId;
        }
    
        this.areaReservationService.saveAreaReservation(reservationData).subscribe(
          {
            next: (response) => {
              if (response.success) {
                this.loader.hide();
                this.router.navigate([ROUTE_PATHS.viewReservation]);
              } else {
                this.loader.hide();
                alert('Erro ao salvar a reserva. Por favor, tente novamente.');
              }
            }
          }
        );
      }
    }
    else {
      alert('Preencha todos os campos obrigatórios!');
    }
  }

  protected addAnswer() {
    if (this.areaReservationAnswerForm.valid) {
      let newAnswer = this.transformToAnswerModel();

      this.areaReservationService.addAnswerToAreaReservation(newAnswer).subscribe({
        next: (response) => {
          if (response.success) {
            alert('Resposta adicionada com sucesso!');
            this.areaReservationAnswerForm.reset();
            this.getAreaReservation(this.areaReservationId);
          } else {
            alert('Erro ao adicionar resposta. Por favor, tente novamente.');
          }
        }
      });
    }
  }

  protected changeStatus(status: AreaReservationStatusEnum) {
    this.areaReservationService.changeAreaReservationStatus(this.areaReservationId, status).subscribe({
      next: (response) => {
        if (response.success) {
          alert('Status alterado com sucesso!');
          this.getAreaReservation(this.areaReservationId);
        } else {
          alert('Erro ao alterar o status. Por favor, tente novamente.');
        }
      }
    })
  }

  get selectedArea(): Area | undefined {
    const selectedId = this.formulario?.get('areaId')?.value;
    return this.areas.find(area => area.id === selectedId);
  }

  protected mapStatus(status: number): string {
    switch (status) {
      case 1: return 'Aguardando Aprovação';
      case 2: return 'Aprovada';
      case 3: return 'Rejeitada';
      default: return 'Desconhecido';
    }
  }

  private transformToAnswerModel(): AreaReservationAnswerModel {
    let model: AreaReservationAnswerModel;

    model = {
      areaReservationId: this.areaReservationId,
      answer: this.areaReservationAnswerForm.get('answer')?.value,
      answeredByUserId: this.userId,
      answeredAt: new Date()
    }

    return model;
  }
}