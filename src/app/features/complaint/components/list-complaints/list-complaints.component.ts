import { Component, OnInit } from '@angular/core';
import { ComplaintService } from '../../services/complaint.service';
import { ComplaintMock, ComplaintStatus } from '../../models/complaint.models';
import { Router } from '@angular/router';

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
  constructor(
    private complaintService: ComplaintService,
    private router: Router) 
  {
    
  }

  ngOnInit() {
    this.userId = localStorage.getItem('userId')

    this.loadComplaints();
  }

  loadComplaints() {

    if(this.userId == '680c0a04085c7259a0221e5aZ') // Trocar para futura validação de síndico
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
        },
        error: err => 
        {
          console.error('Erro loading complaints:', err);
          this.complaints = []; 
        },
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
        },
        error: err => 
        {
          console.error('Erro loading complaints:', err);
          this.complaints = []; 
        },
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
    this.router.navigate(['/complaints/create/'])
  }
  
  
}
