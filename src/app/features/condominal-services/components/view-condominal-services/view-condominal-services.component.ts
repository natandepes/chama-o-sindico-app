import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CondominalServicesService } from '../../services/condominal-services.service';

@Component({
  selector: 'app-view-condominal-services',
  templateUrl: './view-condominal-services.component.html',
  styleUrl: './view-condominal-services.component.scss',
  standalone: false,
})
export class ViewCondominalServiceComponent implements OnInit {
  service: Record<string, unknown> | null = null;
  isEditing = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public condominalServicesService: CondominalServicesService,
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.service = this.condominalServicesService.getService(id ?? '');
    }
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
}
