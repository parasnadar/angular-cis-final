import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthServiceService } from '../../core/services/auth-service.service';
import { UtilityBarComponent } from '../../Shared/utility-bar/utility-bar.component';
import { ChangePasswordModalComponent } from '../../Shared/change-password-modal/change-password-modal.component';

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
    UtilityBarComponent,
    ChangePasswordModalComponent,
  ],
  templateUrl: './memberpb.component.html',
  styleUrl: './memberpb.component.scss',
})
export class MEMBERPBComponent {
  isPasswordModalVisible: boolean = false;

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
      this.isPasswordModalVisible = true;
    } else if (actionType === 'logout') {
      this.authService.logout();
    }
  }
  onPasswordUpdateSaved(payload: any): void {
    console.log(
      'Parent received valid payload. Ready for HTTP request pipeline:',
      payload,
    );
    // Execute backend API post operations here:
    // this.authService.changePassword(payload.username, payload.oldPassword, payload.newPassword).subscribe(...);
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
