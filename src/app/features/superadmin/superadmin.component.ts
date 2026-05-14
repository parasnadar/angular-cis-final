import { Component } from '@angular/core';
import { AuthServiceService } from '../../core/services/auth-service.service';

@Component({
  selector: 'app-superadmin',
  imports: [],
  templateUrl: './superadmin.component.html',
  styleUrl: './superadmin.component.scss',
})
export class SUPERADMINComponent {
  constructor(private authService: AuthServiceService) {}
  onLogout() {
    this.authService.logout();
  }
}
