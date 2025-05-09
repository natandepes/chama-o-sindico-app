import { Component, OnInit } from '@angular/core';
import { ComplaintService } from '../../services/complaint.service';
import { ComplaintMock, ComplaintStatus } from '../../models/complaint.models';
import { Router } from '@angular/router';
import { AuthService } from '../../../authentication/services/auth.service';
import { UserRole } from '../../../authentication/models/user-roles.model';
import { ROUTE_PATHS } from '../../../../app.paths';

@Component({
  selector: 'app-list-complaints',
  templateUrl: './list-complaints.component.html',
  styleUrl: './list-complaints.component.scss',
  standalone: false,
})
export class ListComplaintsComponent implements OnInit {
  complaints: ComplaintMock[] = [];
  rawComplaints: ComplaintMock[] = [];
  userId: string | null = "";
  protected userRole: UserRole | null = null;
  protected readonly UserRoleEnum = UserRole;
  
  constructor(
    private complaintService: ComplaintService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.userRole = this.authService.getUserRole();

    this.loadComplaints();
  }

  loadComplaints() {

    if(this.userRole == this.UserRoleEnum.CondominalManager)
    {

      this.complaintService.getAllComplaints().subscribe({
        next: (response: any) => 
        {
          this.rawComplaints = response?.data ?? [];
  
          this.complaints = this.rawComplaints.map((c: any) => 
          ({
            id: c.id,
            title: c.title,
            description: c.description,
            imageUrl: c.imageUrl,
            status: this.mapStatus(c.status), 
            createdAt: new Date(c.createdAt),
            closedAt: c.closedAt ? new Date(c.closedAt) : null,
            createdByUserId: c.createdByUserId,
            closedByUserId: c.closedByUserId ? null: ''
          }))
        }
      });
    }
    else
    {
      this.complaintService.getAllComplaintsByUserId().subscribe({
        next: (response: any) => 
        {
          this.rawComplaints = response?.data ?? [];
  
          this.complaints = this.rawComplaints.map((c: any) => 
          ({
            id: c.id,
            title: c.title,
            description: c.description,
            imageUrl: c.imageUrl,
            status: this.mapStatus(c.status), 
            createdAt: new Date(c.createdAt),
            closedAt: c.closedAt ? new Date(c.closedAt) : null,
            createdByUserId: c.createdByUserId,
            closedByUserId: c.closedByUserId ? null: ''
          }))
        }
      });
    }
    


  }

  mapStatus(statusNumber: number): ComplaintStatus {
    switch (statusNumber) {
      case 0: return ComplaintStatus.Pending;
      case 1: return ComplaintStatus.InProgress;
      case 2: return ComplaintStatus.Resolved;
      default: return ComplaintStatus.Pending;
    }
  }
  
  protected goToCreateComplaint()
  {
    this.router.navigate([ROUTE_PATHS.createComplaint])
  }

  deleteComplaint(id: string) {
    if (confirm('Tem certeza que deseja deletar esta denúncia?')) {
      this.complaintService.deleteComplaint(id).subscribe({
        next: () => {
          this.complaints = this.complaints.filter(c => c.id !== id);
          alert('Denúncia removida com sucesso');
        }
      });
    }
  }

}