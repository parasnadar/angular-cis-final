import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthServiceService } from '../../core/services/auth-service.service';
import { UtilityBarComponent } from '../../Shared/utility-bar/utility-bar.component';

// PrimeNG v21 Standalone Component Imports
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { Select } from 'primeng/select'; // PrimeNG v21 modern replacement for DropdownModule
import { TagModule } from 'primeng/tag';
import { ProgressBarModule } from 'primeng/progressbar';
import { TooltipModule } from 'primeng/tooltip';
import { MessageModule } from 'primeng/message';
import { SkeletonModule } from 'primeng/skeleton';

export interface BarOptionItem {
  id: string | number;
  label: string;
  icon?: string;
  children?: BarOptionItem[];
  customMeta?: any;
}

@Component({
  selector: 'app-memberpb',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    CardModule,
    DialogModule,
    InputTextModule,
    Select, // Registered for v21 standalone usage
    TagModule,
    ProgressBarModule,
    TooltipModule,
    MessageModule,
    SkeletonModule,
    UtilityBarComponent,
  ],
  templateUrl: './memberpb.component.html',
  styleUrl: './memberpb.component.scss',
})
export class MEMBERPBComponent {
  isPasswordModalVisible: boolean = false;

  // Password visibility tracking toggles
  showOldPassword = false;
  showNewPassword = false;
  showConfirmPassword = false;

  // Real-time component form states
  passwordForm = {
    username: '',
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  // Rule verification evaluation flags
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

  // Enterprise Dummy Dataset for Selection Mapping
  userOptions = [
    { label: 'Administrator (admin)', value: 'admin' },
    { label: 'Clerk Operator (clerk_01)', value: 'clerk_01' },
    { label: 'Reviewing Magistrate (mag_judge)', value: 'mag_judge' },
    { label: 'System Registrar (registrar_office)', value: 'registrar_office' },
  ];

  gstatViewOptions: BarOptionItem[] = [
    { id: 'home', label: 'Home', icon: 'pi pi-home' },
    {
      id: 'listing',
      label: 'Listing',
      icon: 'pi pi-list',
      children: [{ id: 'inter_bench', label: 'Inter Bench' }],
    },
    {
      id: 'report',
      label: 'Report',
      icon: 'pi pi-file',
      children: [
        { id: 'case_docs', label: 'Case Docs' },
        { id: 'mis_report', label: 'Mis Reports' },
        { id: 'efiled_cases', label: 'Efiled Cases' },
        { id: 'case_status', label: 'Case Status' },
      ],
    },
    {
      id: 'cause_list',
      label: 'Causelist',
      icon: 'pi pi-calendar',
      children: [{ id: 'final_causelist', label: 'Final CauseList' }],
    },
    {
      id: 'order',
      label: 'Order',
      icon: 'pi pi-book',
      children: [
        { id: 'generate_order', label: 'Generate Order' },
        { id: 'upload_order', label: 'Upload Order' },
      ],
    },
    {
      id: 'transfer_case',
      label: 'Transfer Case',
      icon: 'pi pi-arrow-h',
      children: [
        { id: 'transfer_request', label: 'Transfer Request' },
        { id: 'transfer_action_taken', label: 'Transfer Action Taken' },
      ],
    },
    {
      id: 'recuse',
      label: 'Recuse',
      icon: 'pi pi-user-minus',
      children: [
        { id: 'recuse_judge_from_case', label: 'Recuse Judge(s) From Case' },
        { id: 'recused_cases', label: 'Recused Cases' },
      ],
    },
  ];

  public visible: boolean = false;
  public loadingValue: number = 0;
  isDarkMode: boolean = false;

  constructor(private authService: AuthServiceService) {
    setInterval(() => {
      this.loadingValue = this.loadingValue >= 100 ? 0 : this.loadingValue + 10;
    }, 2000);
  }

  handleAccountActionEvent(actionType: string): void {
    if (actionType === 'change_password') {
      this.resetPasswordForm();
      this.isPasswordModalVisible = true;
    } else if (actionType === 'logout') {
      this.authService.logout();
    }
  }

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

  saveNewPassword(): void {
    if (!this.isFormValid()) return;

    console.log(
      'Pushing valid password updates safely to system pipeline...',
      this.passwordForm,
    );
    this.isPasswordModalVisible = false;
    this.resetPasswordForm();
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

  handleBarSelectionEvent(event: {
    parent: BarOptionItem;
    child?: BarOptionItem;
  }): void {
    if (event.child) {
      console.log(
        `Triggering Sub-Option Endpoint: ${event.child.id} under parent ${event.parent.id}`,
      );
    } else {
      console.log(`Triggering Standard Option Endpoint: ${event.parent.id}`);
    }
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    const element = document.querySelector('html');
    if (this.isDarkMode) {
      element?.classList.add('my-app-dark');
    } else {
      element?.classList.remove('my-app-dark');
    }
  }

  showDialog() {
    this.visible = true;
  }
  onLogout() {
    this.authService.logout();
  }
}
