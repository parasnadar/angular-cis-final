import { Component } from '@angular/core';
import { AuthServiceService } from '../../core/services/auth-service.service';

@Component({
  selector: 'app-memberpb',
  imports: [],
  templateUrl: './memberpb.component.html',
  styleUrl: './memberpb.component.scss',
})
export class MEMBERPBComponent {
  constructor(private authService: AuthServiceService) {}
  onLogout() {
    this.authService.logout();
  }
}
