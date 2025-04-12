import { Component, OnInit } from '@angular/core';
import { ComplaintService } from '../../services/complaint.service';
import { ComplaintMock } from '../../models/complaint.models';

@Component({
  selector: 'app-view-complaint',
  templateUrl: './view-complaint.component.html',
  styleUrl: './view-complaint.component.scss',
  standalone: false,
})
export class ViewComplaintComponent implements OnInit {
  complaints: ComplaintMock[] = [];
  constructor(private complaintService: ComplaintService) {}

  ngOnInit() {
    this.loadComplaints();
  }

  loadComplaints() {
    this.complaintService.getAllComplaints().subscribe({
      next: (complaints: ComplaintMock[]) => {
        this.complaints = complaints;
        console.log('Got data:', complaints);
      },
      error: err => {
        console.error('Erro loading complaints:', err);
      },
    });
  }
}
