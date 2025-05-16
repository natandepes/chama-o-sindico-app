import { Component, OnInit } from '@angular/core';
import { WarningModel } from '../../models/warning.model';
import { UserRole } from '../../../authentication/models/user-roles.model';
import { AuthService } from '../../../authentication/services/auth.service';
import { WarningService } from '../../services/warning.service';
import { ROUTE_PATHS } from '../../../../app.paths';
import { Router } from '@angular/router';
import { LoaderService } from '../../../shared/services/loader.service';

@Component({
  selector: 'app-view-warnings',
  standalone: false,
  templateUrl: './view-warnings.component.html',
  styleUrl: './view-warnings.component.css',
})
export class ViewWarningsComponent implements OnInit {
  protected searchText: string = '';
  protected allWarnings!: WarningModel[];
  protected userWarnings!: WarningModel[];

  protected userRole: UserRole | null = null;
  protected readonly UserRoleEnum = UserRole;
  protected userId: string | null = null;

  constructor(
    private warningService: WarningService,
    private authService: AuthService,
    private router: Router,
    private loader: LoaderService
  ) {}

  ngOnInit(): void {
    this.userRole = this.authService.getUserRole();
    this.userId = this.authService.getUserId();

    this.getAllWarnings();
  }

  private getAllWarnings() {
    this.loader.show();
    this.warningService.getAllWarnings().subscribe(response => {
      if (response.success && response.data) {
        const all = response.data;
        this.allWarnings = all.filter(warning => warning.targetType === 'all');
        this.userWarnings = all.filter(warning => warning.residentUserId === this.userId);
        this.loader.hide();
      } else {
        this.loader.hide();
        alert('Falha ao carregar os avisos, por favor, tente novamente.');
      }
    });
  }

  protected deleteWarning(warningId: string) {
    if (confirm('Tem certeza que deseja excluir este aviso?')) {
      this.loader.show();
      this.warningService.deleteWarning(warningId).subscribe(response => {
        if (response.success) {
          this.loader.hide();
          this.getAllWarnings();
        } else {
          this.loader.hide();
          alert('Falha ao excluir o aviso, por favor, tente novamente.');
        }
      });
    }
  }

  protected goToCreateWarning() {
    this.router.navigate([ROUTE_PATHS.createWarning]);
  }

  filteredAllWarnings() {
    return this.allWarnings.filter(w => w.title.toLowerCase().includes(this.searchText?.toLowerCase() ?? ''));
  }

  filteredUserWarnings() {
    return this.userWarnings.filter(w => w.title.toLowerCase().includes(this.searchText?.toLowerCase() ?? ''));
  }
}
