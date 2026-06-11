import { Component } from '@angular/core';
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
  selector: 'app-registrar',
  imports: [UtilityBarComponent, ChangePasswordModalComponent],
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

  gstatViewOptions: BarOptionItem[] = [
    { id: 'rhome', label: 'Home', icon: 'pi pi-home' },
    {
      id: 'rdashboard',
      label: 'Dashboard',
      icon: 'pi pi-objects-column',
    },
    {
      id: 'rbench',
      label: 'Bench',
      icon: 'pi pi-hammer',
      children: [
        { id: 'rcreate_bench', label: 'Create Bench' },
        { id: 'rview_bench', label: 'View Bench' },
      ],
    },
    {
      id: 'rlisting',
      label: 'Listing',
      icon: 'pi pi-list',
      children: [
        { id: 'rcreate_bench  ', label: 'Create Bench' },
        { id: 'rview_bench', label: 'View Bench' },
      ],
    },
    {
      id: 'rreport',
      label: 'Report',
      icon: 'pi pi-file',
      children: [
        { id: 'roder_report', label: 'Case Docs' },
        { id: 'rmis_report', label: 'Mis Reports' },
        { id: 'refiled_cases', label: 'Efiled Cases' },
        { id: 'rfinilized_cause', label: 'Finalized Causelist Reports' },
        { id: 'raccepted', label: 'APL 02A Part B Accepted' },
        { id: 'rrejected', label: 'APL 02A Part B Rejected' },
        { id: 'rproceeding_calender', label: 'Proceeding Calender' },
        { id: 'rcourt_wise_pendency', label: 'Court-wise pendency' },
        { id: 'rdate_wise_pendency', label: 'Date-wise pendency' },
        { id: 'rcase_status', label: 'Case Status' },
        { id: 'rnotification_report', label: 'Notification Report' },
      ],
    },

    {
      id: 'rproceeding',
      label: 'Proceeding',
      icon: 'pi pi-history',
      children: [
        { id: 'rcase_proceeding', label: 'Case Proceeding' },
        { id: 'runscheduled_listing', label: 'Unscheduled Listing' },
      ],
    },
    {
      id: 'rcause_list',
      label: 'Causelist',
      icon: 'pi pi-calendar',
      children: [
        { id: 'rdraft_causelist', label: 'Draft Causelist' },
        { id: 'rfinal_causelist', label: 'Final Causelist' },
      ],
    },
    {
      id: 'rorder',
      label: 'Order',
      icon: 'pi pi-book',
      children: [
        { id: 'rgenerate_order', label: 'Generate Order' },
        { id: 'rupload_order', label: 'Upload Order' },
      ],
    },
    {
      id: 'rnotice',
      label: 'Notice',
      icon: 'pi pi-megaphone',
      children: [
        { id: 'rcreate_notice', label: 'Create Notice' },
        { id: 'rnotice_lists', label: 'Notice Lists' },
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
    if (event.child) {
      console.log(
        `Triggering Sub-Option Endpoint: ${event.child.id} under parent ${event.parent.id}`,
      );
    } else {
      console.log(`Triggering Standard Option Endpoint: ${event.parent.id}`);
    }
  }
}
