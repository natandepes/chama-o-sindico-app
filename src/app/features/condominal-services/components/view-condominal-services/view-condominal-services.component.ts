import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CondominalServicesService } from '../../services/condominal-services.service';
import { CondominalService } from '../../models/condominal-service.model';
import { ServiceComment } from '../../models/service-comment.model';
import { ROUTE_PATHS } from '../../../../app.paths';

@Component({
  selector: 'app-view-condominal-services',
  templateUrl: './view-condominal-services.component.html',
  styleUrl: './view-condominal-services.component.scss',
  standalone: false,
  encapsulation: ViewEncapsulation.None,
})
export class ViewCondominalServiceComponent implements OnInit {
  service: CondominalService | null = null;
  comments: ServiceComment[] = [];
  isCommenting = false;
  isEditing = false;
  newComment = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public condominalServicesService: CondominalServicesService,
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.condominalServicesService.getService(id).subscribe({
        next: response => {
          if (response.success) {
            this.service = response.data!;
            this.getComments(this.service.id!);
          } else {
            console.error('Error fetching service:', response.message);
          }
        },
        error: error => {
          console.error('Error fetching service:', error);
        },
      });
    }
  }

  getComments(serviceId: string) {
    this.condominalServicesService.getServiceComments(serviceId).subscribe({
      next: response => {
        if (response.success) {
          this.comments = response.data!;
        } else {
          console.error('Error fetching comments:', response.message);
        }
      },
      error: error => {
        console.error('Error fetching comments:', error);
      },
    });
  }

  addComment() {
    this.isCommenting = true;
  }

  submitComment() {
    if (this.newComment.trim()) {
      const comment: ServiceComment = {
        condominalServiceId: this.service!.id!,
        comment: this.newComment,
        createdAt: new Date(),
      };

      this.condominalServicesService.createComment(comment).subscribe({
        next: response => {
          if (response.success) {
            alert('Comentário adicionado com sucesso!');
            this.getComments(this.service!.id!);
            this.newComment = '';
            this.isCommenting = false;
          } else {
            console.error('Error creating comment:', response.message);
          }
        },
        error: error => {
          console.error('Error creating comment:', error);
        },
      });
    }
  }

  cancelComment() {
    this.isCommenting = false;
    this.newComment = '';
  }

  toEdit() {
    this.router.navigate(['/servico', this.service!['id'], 'editar']);
  }

  toggleEditing() {
    this.isEditing = !this.isEditing;
  }

  saveChanges() {
    // Aqui você poderia salvar no serviço, se quiser persistir
    this.isEditing = false;
  }

  goBack() {
    this.router.navigate([ROUTE_PATHS.listCondominalService]);
  }
}
