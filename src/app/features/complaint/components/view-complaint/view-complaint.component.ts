import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComplaintMock, ComplaintStatus, ComplaintStatusEnum } from '../../models/complaint.models';
import { ComplaintService } from '../../services/complaint.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserRole } from '../../../authentication/models/user-roles.model';
import { AuthService } from '../../../authentication/services/auth.service';
import { ComplaintAnswerModel } from '../../models/complaint-answer.model';
import { ComplaintFullResponseModel } from '../../models/complaint-full-response.model';
import { ROUTE_PATHS } from '../../../../app.paths';

@Component({
  selector: 'app-view-complaint',
  standalone: false,
  templateUrl: './view-complaint.component.html',
  styleUrl: './view-complaint.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ViewComplaintComponent implements OnInit {
  protected viewComplaintForm!: FormGroup;
  protected complaintAnswerForm!: FormGroup;
  protected complaintModel!: ComplaintFullResponseModel;

  protected userRole: UserRole | null = null;
  protected readonly UserRoleEnum = UserRole;

  protected complaintStatus!: ComplaintStatusEnum;
  protected readonly complaintStatusEnum = ComplaintStatusEnum;

  private complaintId!: string;

  constructor(
    private complaintService: ComplaintService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.viewComplaintForm = this.formBuilder.group({
      title: [{ value: '', disabled: true }],
      createdAt: [{ value: '', disabled: true }],
      description: [{ value: '', disabled: true }],
      status: [{ value: '', disabled: true }],
    });

    this.complaintAnswerForm = this.formBuilder.group({
      answer: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.userRole = this.authService.getUserRole();
    this.complaintId = this.route.snapshot.paramMap.get('id') || '';
    this.loadComplaint(this.complaintId);
  }

  loadComplaint(id: string) {
    this.complaintService.getComplaintById(id).subscribe({
      next: response => {
        if (response.success && response.data) {
          this.complaintModel = {
            title: response.data.title,
            description: response.data.description,
            imageUrl: response.data.imageUrl,
            status: response.data.status,
            createdAt: new Date(response.data.createdAt),
            closedAt: response.data.closedAt ? new Date(response.data.closedAt) : null,
            createdByUserName: response.data.createdByUserName,
            closedByUserName: response.data.closedByUserName,
            answers: response.data.answers,
          };

          this.complaintStatus = response.data.status as unknown as ComplaintStatusEnum;

          this.viewComplaintForm.patchValue(this.complaintModel);
          this.viewComplaintForm.get('status')?.setValue(this.mapStatus((response.data.status as unknown as number) ?? 0));
        }
      },
    });
  }

  private mapStatus(statusNumber: number): string {
    switch (statusNumber) {
      case 0:
        return 'Pendente';
      case 1:
        return 'Em progresso';
      case 2:
        return 'Resolvida';
      default:
        return '';
    }
  }

  protected addAnswer() {
    if (this.complaintAnswerForm.valid) {
      let newAnser = this.transformToAnswerModel();

      this.complaintService.addAnswerToComplaint(newAnser).subscribe({
        next: response => {
          if (response.success) {
            alert('Resposta adicionada com sucesso!');
            this.complaintAnswerForm.reset();
            this.loadComplaint(this.complaintId);
          }
        },
      });
    }
  }

  protected changeStatus(status: ComplaintStatusEnum) {
    this.complaintService.changeComplaintStatus(this.complaintId, status).subscribe({
      next: response => {
        if (response.success) {
          alert('Status alterado com sucesso!');
          this.loadComplaint(this.complaintId);
        }
      },
    });
  }

  protected goToComplaints() {
    this.router.navigate([ROUTE_PATHS.listComplaints]);
  }

  private transformToAnswerModel(): ComplaintAnswerModel {
    let model: ComplaintAnswerModel;

    model = {
      complaintId: this.complaintId,
      answer: this.complaintAnswerForm.get('answer')?.value,
      answeredByUserId: this.authService.getUserId() || '',
      answeredAt: new Date(),
    };

    return model;
  }
}
