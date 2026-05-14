import { Component } from '@angular/core';
import { AuthServiceService } from '../../core/services/auth-service.service';
import { ToastModule } from 'primeng/toast';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-login',
  standalone: true,

  imports: [ToastModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(
    private authService: AuthServiceService,
    private notify: NotificationService,
  ) {}

  loginAs(role: string) {
    this.notify.showSuccess('Operation completed successfully!');
    this.notify.showError('Operation completed successfully!');
    this.notify.showInfo('Operation completed successfully!');
    this.notify.showWarning('Operation completed successfully!');

    this.authService.handleLogin(role);
  }
}
