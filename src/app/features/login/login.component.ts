import { Component } from '@angular/core';
import { AuthServiceService } from '../../core/services/auth-service.service';

@Component({
  selector: 'app-login',
  standalone: true,
  template: `
    <div class="login-box">
      <h2>Select Role (Demo)</h2>
      <button (click)="loginAs('admin')">Login as Admin</button>
      <button (click)="loginAs('manager')">Login as Manager</button>
      <!-- Add others -->
    </div>
  `,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(private authService: AuthServiceService) {}

  loginAs(role: string) {
    this.authService.handleLogin(role);
  }
}
