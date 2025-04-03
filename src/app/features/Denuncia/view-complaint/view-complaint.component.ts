import { Component, OnInit } from '@angular/core';
import { ComplaintService } from '../complaint.service';
import { complaintMock } from '../models/denuncia.models';

@Component({
  selector: 'app-view-complaint',
  standalone: false,
  templateUrl: './view-complaint.component.html',
  styleUrl: './view-complaint.component.css'
})

export class ViewComplaintComponent implements OnInit {
      complaints: complaintMock[] = [];
      constructor(private complaintService: ComplaintService) {}
  
    ngOnInit() {
      this.loadComplaints()
    }

    loadComplaints() {
      this.complaintService.getAllComplaints().subscribe({
        next: (complaints) => {
          this.complaints = complaints;
          console.log('Dados recebidos:', complaints);
        },
        error: (err) => {
          console.error('Erro ao carregar denúncias:', err);
        }
      });
    }


}
