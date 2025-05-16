import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CondominalServicesService } from '../../services/condominal-services.service';
import { CondominalService } from '../../models/condominal-service.model';
import { ServiceComment } from '../../models/service-comment.model';
import { ROUTE_PATHS } from '../../../../app.paths';
import { LoaderService } from '../../../shared/services/loader.service';
import { AuthService } from '../../../authentication/services/auth.service';
import { UserRole } from '../../../authentication/models/user-roles.model';

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
  protected userRole: UserRole | null = null;
  protected readonly UserRoleEnum = UserRole;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public condominalServicesService: CondominalServicesService,
    private loader: LoaderService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.userRole = this.authService.getUserRole();
    
    if (id) {
      this.loader.show();
      this.condominalServicesService.getService(id).subscribe({
        next: response => {
          if (response.success) {
            this.service = response.data!;
            this.getComments(this.service.id!);
            this.loader.hide();
          } else {
            this.loader.hide();
            alert('Erro ao buscar o serviço. Tente novamente mais tarde.');
          }
        },
      });
    }
  }

  getComments(serviceId: string) {
    this.loader.show();
    this.condominalServicesService.getServiceComments(serviceId).subscribe({
      next: response => {
        if (response.success) {
          this.comments = response.data!;
        } else {
          this.loader.hide();
          alert('Erro ao buscar os comentários. Tente novamente mais tarde.');
        }
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

      this.loader.show();

      this.condominalServicesService.createComment(comment).subscribe({
        next: response => {
          if (response.success) {
            this.getComments(this.service!.id!);
            this.newComment = '';
            this.isCommenting = false;
            this.loader.hide();
          } else {
            this.loader.hide();
            alert('Erro ao criar o comentário. Tente novamente mais tarde.');
          }
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
