import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CondominalServicesService } from '../../services/condominal-services.service';
// import { ServicoService } from '../../services/servico.service'; // ajuste o caminho conforme sua estrutura

@Component({
  selector: 'app-view-condominal-services',
  templateUrl: './view-condominal-services.component.html',
  styleUrls: ['./view-condominal-services.component.css'],
  standalone: false
})

export class ViewCondominalServiceComponent implements OnInit {
  service: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public condominalServicesService: CondominalServicesService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.service = this.condominalServicesService.getService(id ?? '');
      console.log('Serviço carregado:', this.service);
    }
  }
  
  toEdit() {
    this.router.navigate(['/servico', this.service.id, 'editar']);
  }
}
