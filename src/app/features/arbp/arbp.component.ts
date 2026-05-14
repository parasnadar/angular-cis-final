import { Component } from '@angular/core';
import { AuthServiceService } from '../../core/services/auth-service.service';

@Component({
  selector: 'app-arbp',
  imports: [],
  templateUrl: './arbp.component.html',
  styleUrl: './arbp.component.scss',
})
export class ARBPComponent {
  constructor(private authService: AuthServiceService) {}
  onLogout() {
    this.authService.logout();
  }
}
