import { Component, OnInit } from '@angular/core';
import { ComplaintService } from '../../services/complaint.service';
import { ComplaintMock } from '../../models/complaint.models';

@Component({
  selector: 'app-list-complaints',
  templateUrl: './list-complaints.component.html',
  styleUrl: './list-complaints.component.scss',
  standalone: false,
})
export class ListComplaintsComponent implements OnInit {
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
