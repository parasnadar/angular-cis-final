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
  private readonly emailRegex =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

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
      this.notify.showError('Please input your username and account password.');
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
      this.notify.showError('Please fill out a valid 6-digit OTP code.');
      return;
    }

    if (otpValue !== '123456') {
      this.notify.showError('Wrong Otp Entered, Please Try Again');
      return;
    }

    this.displayOtpModal = false;
    this.authService.handleLogin(this.selectedRoleOnHold);
    this.notify.showSuccess('Login Successfull');
  }

  openForgotPasswordModal(): void {
    this.displayForgotModal = true;
  }

  regenerateCode(): void {
    this.notify.showSuccess(
      'Otp has been sent to xxx@gmail.com and 98xxx001xx succesfully',
    );
  }

  submitForgotPasswordRecovery(
    emailValue: string,
    captcha?: string,
    userValue?: string,
  ): void {
    if (!emailValue || !userValue) {
      this.notify.showError('Please input your username and email id.');
      return;
    }
    if (!this.emailRegex.test(emailValue)) {
      this.notify.showError(
        'Invalid email format. Please provide a valid email ID (e.g., name@domain.gov.in).',
      );
      return;
    }

    if (captcha?.toUpperCase() !== this.currentCaptchaCode) {
      this.notify.showError(
        'Security checking captcha text validation failed.',
      );
      return;
    }

    this.displayForgotModal = false;
    this.notify.showSuccess(
      'Security recovery guidelines transmitted to destination parameters.',
    );
  }
}
