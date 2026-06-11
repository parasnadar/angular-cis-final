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
  selector: 'app-superadmin',
  imports: [UtilityBarComponent, ChangePasswordModalComponent],
  templateUrl: './superadmin.component.html',
  styleUrl: './superadmin.component.scss',
})
export class SUPERADMINComponent {
  constructor(private authService: AuthServiceService) {}
  isPasswordModalVisible: boolean = false;
  public visible: boolean = false;
  loggedInUser = {
    name: 'Super Admin',
    initials: 'SA',
  };

  gstatViewOptions: BarOptionItem[] = [
    { id: 'home', label: 'Home', icon: 'pi pi-home' },
    {
      id: 'suuser',
      label: 'User',
      icon: 'pi pi-user',
      children: [
        { id: 'sucreate_user', label: 'Create User' },
        { id: 'suview_user', label: 'View User' },
      ],
    },
    {
      id: 'sumenu',
      label: 'Menu',
      icon: 'pi pi-bars',
      children: [
        { id: 'sucreate_menu', label: 'Create Menu' },
        { id: 'sucreate_sub_menu', label: 'Create Submenu' },
        { id: 'suview_menu', label: 'View Menu' },
        { id: 'suview_sub_view', label: 'View Submenu' },
      ],
    },
    {
      id: 'sumasters',
      label: 'Masters',
      icon: 'pi pi-building-columns',
      children: [{ id: 'sujudge_master', label: 'Judge Master' }],
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
