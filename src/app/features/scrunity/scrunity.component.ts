import { Component } from '@angular/core';
import { AuthServiceService } from '../../core/services/auth-service.service';

@Component({
  selector: 'app-scrunity',
  imports: [],
  templateUrl: './scrunity.component.html',
  styleUrl: './scrunity.component.scss',
})
export class SCRUNITYComponent {
  constructor(private authService: AuthServiceService) {}
  onLogout() {
    this.authService.logout();
  }
}
