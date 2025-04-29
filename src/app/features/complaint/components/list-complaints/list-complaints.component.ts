import { Component, OnInit } from '@angular/core';
import { ComplaintService } from '../../services/complaint.service';
import { ComplaintMock, ComplaintStatus } from '../../models/complaint.models';

@Component({
  selector: 'app-list-complaints',
  templateUrl: './list-complaints.component.html',
  styleUrl: './list-complaints.component.scss',
  standalone: false,
})
export class ListComplaintsComponent implements OnInit {
  complaints: ComplaintMock[] = [];
  rawComplaints: ComplaintMock[] = [];
  constructor(private complaintService: ComplaintService) {}

  ngOnInit() {
    this.loadComplaints();
  }

  loadComplaints() {
    this.complaintService.getAllComplaints().subscribe({
      next: (response: any) => {
        this.rawComplaints = response?.data ?? [];

        this.complaints = this.rawComplaints.map((c: any) => ({
          id: c.id,
          title: c.title,
          description: c.description,
          imageUrl: c.imageUrl,
          status: this.mapStatus(c.status), 
          createdAt: new Date(c.createdAt),
          closedAt: c.closedAt ? new Date(c.closedAt) : null,
          closedByUserId: this.closedByUserId ? null: ''
        }))

      },
      error: err => {
        console.error('Erro loading complaints:', err);
        this.complaints = []; 
      },
    });
  }

  mapStatus(statusNumber: number): ComplaintStatus {
    switch (statusNumber) {
      case 0: return ComplaintStatus.Pending;
      case 1: return ComplaintStatus.InProgress;
      case 2: return ComplaintStatus.Resolved;
      default: return ComplaintStatus.Pending;
    }
  }
  
  
}
