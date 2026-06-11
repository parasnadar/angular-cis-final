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
  selector: 'app-arbp',
  imports: [UtilityBarComponent, ChangePasswordModalComponent],
  templateUrl: './arbp.component.html',
  styleUrl: './arbp.component.scss',
})
export class ARBPComponent {
  constructor(private authService: AuthServiceService) {}
  isPasswordModalVisible: boolean = false;
  public visible: boolean = false;
  loggedInUser = {
    name: 'Arbp',
    initials: 'A',
  };

  gstatViewOptions: BarOptionItem[] = [
    { id: 'ahome', label: 'Home', icon: 'pi pi-home' },

    {
      id: 'areport',
      label: 'Report',
      icon: 'pi pi-file',
      children: [
        { id: 'amis_report', label: 'Mis Reports' },
        { id: 'asearch_cases', label: 'Search Case' },
        { id: 'adefect_notices', label: 'Defect Notices' },
        { id: 'ascrutinized_cases', label: 'Scrutinized Cases' },
      ],
    },

    {
      id: 'aproceeding',
      label: 'Proceeding',
      icon: 'pi pi-history',
      children: [{ id: 'acase_proceeding', label: 'Case Proceeding' }],
    },
    {
      id: 'acause_list',
      label: 'Causelist',
      icon: 'pi pi-calendar',
      children: [
        { id: 'adraft_causelist', label: 'Draft Causelist' },
        { id: 'afinal_causelist', label: 'Final Causelist' },
      ],
    },
    {
      id: 'adocument_scrutiny',
      label: 'Document Scrutiny',
      icon: 'pi pi-file-check',
      children: [{ id: 'ascrutiny', label: 'Scrutiny' }],
    },
    {
      id: 'anotice',
      label: 'Notice',
      icon: 'pi pi-megaphone',
      children: [
        { id: 'acreate_notice', label: 'Create Notice' },
        { id: 'anotice_lists', label: 'Notice Lists' },
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
