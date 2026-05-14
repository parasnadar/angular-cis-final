import { Component } from '@angular/core';
import { AuthServiceService } from '../../core/services/auth-service.service';

@Component({
  selector: 'app-steno',
  imports: [],
  templateUrl: './steno.component.html',
  styleUrl: './steno.component.scss',
})
export class STENOComponent {
  constructor(private authService: AuthServiceService) {}
  onLogout() {
    this.authService.logout();
  }
}
