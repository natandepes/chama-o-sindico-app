import { Component, OnInit } from '@angular/core';
import { ComplaintService } from '../../services/complaint.service';
import { ComplaintMock, ComplaintStatus } from '../../models/complaint.models';
import { Router } from '@angular/router';
import { AuthService } from '../../../authentication/services/auth.service';
import { UserRole } from '../../../authentication/models/user-roles.model';
import { ROUTE_PATHS } from '../../../../app.paths';
import { ComplaintResponseModel } from '../../models/complaint-response.model';
import { LoaderService } from '../../../shared/services/loader.service';

@Component({
  selector: 'app-list-complaints',
  templateUrl: './list-complaints.component.html',
  styleUrl: './list-complaints.component.scss',
  standalone: false,
})
export class ListComplaintsComponent implements OnInit {
  complaints: ComplaintResponseModel[] = [];
  searchText: string = '';
  protected userRole: UserRole | null = null;
  protected readonly UserRoleEnum = UserRole;
  protected readonly ComplaintStatusEnum = ComplaintStatus;

  constructor(
    private complaintService: ComplaintService,
    private router: Router,
    private authService: AuthService,
    private loader: LoaderService,
  ) {}

  ngOnInit() {
    this.userRole = this.authService.getUserRole();

    this.loadComplaints();
  }

  loadComplaints() {
    if (this.userRole == this.UserRoleEnum.CondominalManager) {
      this.loader.show();
      this.complaintService.getAllComplaints().subscribe({
        next: response => {
          if (response.success && response.data) {
            this.complaints = response.data!.map((c: any) => ({
              complaintId: c.complaintId,
              title: c.title,
              description: c.description,
              status: this.mapStatus(c.status),
              createdAt: new Date(c.createdAt),
              createdByUserName: c.createdByUserName,
            }));

            this.loader.hide();
          }
        },
      });
    } else {
      this.loader.show();
      this.complaintService.getAllComplaintsByUserId().subscribe({
        next: (response: any) => {
          if (response.success && response.data) {
            this.complaints = response.data!.map((c: any) => ({
              complaintId: c.complaintId,
              title: c.title,
              description: c.description,
              status: this.mapStatus(c.status),
              createdAt: new Date(c.createdAt),
              createdByUserName: c.createdByUserName,
            }));

            this.loader.hide();
          }
        },
      });
    }
  }

  mapStatus(statusNumber: number): ComplaintStatus {
    switch (statusNumber) {
      case 0:
        return ComplaintStatus.Pending;
      case 1:
        return ComplaintStatus.InProgress;
      case 2:
        return ComplaintStatus.Resolved;
      default:
        return ComplaintStatus.Pending;
    }
  }

  protected goToCreateComplaint() {
    this.router.navigate([ROUTE_PATHS.createComplaint]);
  }

  deleteComplaint(id: string, idCreator: string | null) {
    if (confirm('Tem certeza que deseja deletar esta ocorrência?')) {
      this.loader.show();
      this.complaintService.deleteComplaint(id).subscribe({
        next: () => {
          this.complaints = this.complaints.filter(c => c.complaintId !== id);
          this.loader.hide();
          this.loadComplaints();
        },
      });
    }
  }

  filterComplaints() {
    if (!this.searchText) return this.complaints;
    return this.complaints.filter(c => c.title.toLocaleLowerCase().includes(this.searchText.toLocaleLowerCase()));
  }
}
