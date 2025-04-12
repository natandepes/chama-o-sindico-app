import { Component } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  isOpen = false;

  constructor(private readonly sidebarService: SidebarService) {
    this.sidebarService.isOpen$.subscribe(open => {
      this.isOpen = open;
    });
  }

  toggleSidebar() {
    this.sidebarService.toggle();
  }
}
