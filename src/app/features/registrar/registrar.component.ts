import { Component } from '@angular/core';
import { AuthServiceService } from '../../core/services/auth-service.service';

@Component({
  selector: 'app-registrar',
  imports: [],
  templateUrl: './registrar.component.html',
  styleUrl: './registrar.component.scss',
})
export class REGISTRARComponent {
  constructor(private authService: AuthServiceService) {}
  onLogout() {
    this.authService.logout();
  }
}
