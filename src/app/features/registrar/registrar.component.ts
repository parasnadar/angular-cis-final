import { Component, Type } from '@angular/core';
import { AuthServiceService } from '../../core/services/auth-service.service';
import { UtilityBarComponent } from '../../Shared/utility-bar/utility-bar.component';
import { ChangePasswordModalComponent } from '../../Shared/change-password-modal/change-password-modal.component';
import { MENU_REGISTRY } from '../../core/menu-registry';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
import { InputTextModule } from 'primeng/inputtext';

import { ButtonModule } from 'primeng/button';
export interface BarOptionItem {
  id: string | number;
  label: string;
  icon?: string;
  children?: BarOptionItem[];
  customMeta?: any;
}
@Component({
  selector: 'app-registrar',
  standalone: true,
  imports: [
    CommonModule,
    UtilityBarComponent,
    ChangePasswordModalComponent,
    ReactiveFormsModule,
    DatePickerModule,
    ButtonModule,
    InputTextModule,
  ],
  templateUrl: './registrar.component.html',
  styleUrl: './registrar.component.scss',
})
export class REGISTRARComponent {
  constructor(private authService: AuthServiceService) {}
  isPasswordModalVisible: boolean = false;
  public visible: boolean = false;
  loggedInUser = {
    name: 'Registrar',
    initials: 'R',
  };
  activeView: string = 'registrarhome';
  activeComponentType: Type<any> | null = null;
  gstatViewOptions: BarOptionItem[] = [
    { id: 'registrarhome', label: 'Home', icon: 'pi pi-home' },
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'pi pi-objects-column',
    },
    {
      id: 'bench',
      label: 'Bench',
      icon: 'pi pi-hammer',
      children: [
        { id: 'create_bench', label: 'Create Bench' },
        { id: 'view_bench', label: 'View Bench' },
      ],
    },
    {
      id: 'listing',
      label: 'Listing',
      icon: 'pi pi-list',
      children: [
        { id: 'fresh_case_listing', label: 'Fresh Case Listing' },
        { id: 'old_case_listing', label: 'Old Case Listing' },
        { id: 'inter_bench', label: 'Inter Bench' },
      ],
    },
    {
      id: 'report',
      label: 'Report',
      icon: 'pi pi-file',
      children: [
        { id: 'order_report', label: 'Order Report' },
        { id: 'mis_report', label: 'Mis Reports' },
        { id: 'finilized_cause_list', label: 'Finalized Causelist Calendar' },
        { id: 'efiled_cases', label: 'Efiled Cases' },
        { id: 'accepted', label: 'APL 02A Part B Accepted' },
        { id: 'date_wise_pendency', label: 'Date-wise pendency' },
        { id: 'rejected', label: 'APL 02A Part B Rejected' },
        { id: 'court_wise_pendency', label: 'Court-wise pendency' },
        { id: 'proceeding_calender', label: 'Proceeding Calender' },
        { id: 'case_status', label: 'Case Status' },
        { id: 'notification_report', label: 'Notification Report' },
      ],
    },

    {
      id: 'proceeding',
      label: 'Proceeding',
      icon: 'pi pi-history',
      children: [
        { id: 'case_proceeding', label: 'Case Proceeding' },
        { id: 'unscheduled_listing', label: 'Unscheduled Listing' },
      ],
    },
    {
      id: 'cause_list',
      label: 'Causelist',
      icon: 'pi pi-calendar',
      children: [
        { id: 'draft_causelist', label: 'Draft Causelist' },
        { id: 'final_causelist', label: 'Final Causelist' },
      ],
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
      id: 'notice',
      label: 'Notice',
      icon: 'pi pi-megaphone',
      children: [
        { id: 'create_notice', label: 'Create Notice' },
        { id: 'notice_lists', label: 'Notice Lists' },
      ],
    },
  ];

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
    const selectedId = event.child
      ? (event.child.id as string)
      : (event.parent.id as string);
    this.activeView = selectedId;

    // Dynamically look up the component type using the string ID from MENU_REGISTRY
    if (selectedId === 'registrarhome') {
      this.activeComponentType = null;
    } else {
      this.activeComponentType = MENU_REGISTRY[selectedId] || null;
    }
  }
}
