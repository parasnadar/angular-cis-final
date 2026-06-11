import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// PrimeNG v21 Standalone Component Imports
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { Select } from 'primeng/select';

@Component({
  selector: 'app-change-password-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    Select,
  ],
  templateUrl: './change-password-modal.component.html',
  styleUrl: './change-password-modal.component.scss', // Move the modal styles here!
})
export class ChangePasswordModalComponent {
  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() onSave = new EventEmitter<any>();

  // Visibility toggle flags
  showOldPassword = false;
  showNewPassword = false;
  showConfirmPassword = false;

  passwordForm = {
    username: '',
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  validationRules = {
    minLength: false,
    hasUpper: false,
    hasLower: false,
    hasNumber: false,
    hasSpecial: false,
    passwordsMatch: false,
  };

  isNewPasswordTouched = false;
  isConfirmPasswordTouched = false;

  // Shared user profile dummy collection template
  userOptions = [
    { label: 'Administrator (admin)', value: 'admin' },
    { label: 'Clerk Operator (clerk_01)', value: 'clerk_01' },
    { label: 'Reviewing Magistrate (mag_judge)', value: 'mag_judge' },
    { label: 'System Registrar (registrar_office)', value: 'registrar_office' },
  ];

  validatePasswordInput(): void {
    this.isNewPasswordTouched = true;
    const pass = this.passwordForm.newPassword || '';

    this.validationRules.minLength = pass.length >= 8;
    this.validationRules.hasUpper = /[A-Z]/.test(pass);
    this.validationRules.hasLower = /[a-z]/.test(pass);
    this.validationRules.hasNumber = /[0-9]/.test(pass);
    this.validationRules.hasSpecial = /[!@#$%^&*(),.?":{}|<>_]/.test(pass);

    this.checkPasswordMatch();
  }

  checkPasswordMatch(): void {
    if (this.passwordForm.confirmPassword) {
      this.isConfirmPasswordTouched = true;
    }
    this.validationRules.passwordsMatch =
      this.passwordForm.newPassword === this.passwordForm.confirmPassword &&
      this.passwordForm.confirmPassword.length > 0;
  }

  isFormValid(): boolean {
    return (
      !!this.passwordForm.username &&
      this.passwordForm.oldPassword.trim() !== '' &&
      this.validationRules.minLength &&
      this.validationRules.hasUpper &&
      this.validationRules.hasLower &&
      this.validationRules.hasNumber &&
      this.validationRules.hasSpecial &&
      this.validationRules.passwordsMatch
    );
  }

  closeModal(): void {
    this.visible = false;
    this.visibleChange.emit(false);
    this.resetPasswordForm();
  }

  submitPasswordUpdate(): void {
    if (!this.isFormValid()) return;

    // Emit the clean form fields data object back out to the parent hook
    this.onSave.emit({
      username: this.passwordForm.username,
      oldPassword: this.passwordForm.oldPassword,
      newPassword: this.passwordForm.newPassword,
    });

    this.closeModal();
  }

  resetPasswordForm(): void {
    this.passwordForm = {
      username: '',
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    };
    this.validationRules = {
      minLength: false,
      hasUpper: false,
      hasLower: false,
      hasNumber: false,
      hasSpecial: false,
      passwordsMatch: false,
    };
    this.isNewPasswordTouched = false;
    this.isConfirmPasswordTouched = false;
    this.showOldPassword = false;
    this.showNewPassword = false;
    this.showConfirmPassword = false;
  }
}
