import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// PrimeNG Clean Layout Imports Block
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';

import { AuthServiceService } from '../../core/services/auth-service.service';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ToastModule,
    InputTextModule,
    CheckboxModule,
    ButtonModule,
    DialogModule,
    IconFieldModule,
    InputIconModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  hasTransitioned: boolean = false;

  // Dialog Display Controllers Flags
  displayOtpModal: boolean = false;
  displayForgotModal: boolean = false;
  selectedRoleOnHold: string = '';

  // Input Data States
  showPassword: boolean = false;
  currentCaptchaCode: string = '1D0RQ4';

  constructor(
    private authService: AuthServiceService,
    private notify: NotificationService,
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.triggerTransition();
    }, 600);
  }

  triggerTransition(): void {
    if (!this.hasTransitioned) {
      this.hasTransitioned = true;
    }
  }

  regenerateCaptcha(): void {
    const pool = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += pool.charAt(Math.floor(Math.random() * pool.length));
    }
    this.currentCaptchaCode = code;
  }

  processInitialLogin(
    role: string,
    user?: string,
    pass?: string,
    captcha?: string,
  ): void {
    if (!user || !pass) {
      this.notify.showWarning(
        'Please input your username and account password.',
      );
      return;
    }
    if (captcha?.toUpperCase() !== this.currentCaptchaCode) {
      this.notify.showError(
        'Security checking captcha text validation failed.',
      );
      return;
    }

    this.selectedRoleOnHold = role;
    this.displayOtpModal = true;
  }

  verifyOtpCode(otpValue: string): void {
    if (!otpValue || otpValue.length !== 6) {
      this.notify.showWarning('Please fill out a valid 6-digit OTP code.');
      return;
    }

    this.displayOtpModal = false;
    this.authService.handleLogin(this.selectedRoleOnHold);
  }

  openForgotPasswordModal(): void {
    this.displayForgotModal = true;
  }

  submitForgotPasswordRecovery(emailValue: string): void {
    if (!emailValue) {
      this.notify.showWarning(
        'Please specify your registered organizational email identifier.',
      );
      return;
    }

    this.displayForgotModal = false;
    this.notify.showSuccess(
      'Security recovery guidelines transmitted to destination parameters.',
    );
  }
}
