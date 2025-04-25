import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateCondominalServiceComponent } from './create-condominal-services.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CondominalServicesService } from '../../services/condominal-services.service';

describe('CreateCondominalServiceComponent', () => {
  let component: CreateCondominalServiceComponent;
  let fixture: ComponentFixture<CreateCondominalServiceComponent>;
  let mockRouter = { navigate: jasmine.createSpy('navigate') };
  let mockService = {
    saveService: jasmine.createSpy('saveService'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateCondominalServiceComponent],
      imports: [ReactiveFormsModule], // Importa os módulos necessários para formulários reativos
      providers: [
        { provide: Router, useValue: mockRouter }, // Simula o Router
        { provide: CondominalServicesService, useValue: mockService }, // Simula o serviço
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateCondominalServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty values', () => {
    expect(component.serviceForm.value).toEqual({
      serviceName: '',
      serviceProvider: '',
      phone: '',
      serviceDescription: '',
    });
  });

  it('should call saveService and navigate on form submission', () => {
    component.serviceForm.setValue({
      serviceName: 'Teste',
      serviceProvider: 'Empresa X',
      phone: '123456789',
      serviceDescription: 'Descrição do serviço',
    });

    component.onSubmit();

    expect(mockService.saveService).toHaveBeenCalledWith('123', component.serviceForm.value);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/service', '123']);
  });
});
