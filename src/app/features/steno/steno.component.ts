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
  selector: 'app-steno',
  imports: [UtilityBarComponent, ChangePasswordModalComponent],
  templateUrl: './steno.component.html',
  styleUrl: './steno.component.scss',
})
export class STENOComponent {
  constructor(private authService: AuthServiceService) {}
  isPasswordModalVisible: boolean = false;
  public visible: boolean = false;
  loggedInUser = {
    name: 'Steno',
    initials: 'S',
  };

  gstatViewOptions: BarOptionItem[] = [
    { id: 'sthome', label: 'Home', icon: 'pi pi-home' },
    {
      id: 'stcause_list',
      label: 'Causelist',
      icon: 'pi pi-calendar',
      children: [{ id: 'stfinal_causelist', label: 'Final Causelist' }],
    },
    {
      id: 'storder',
      label: 'Order',
      icon: 'pi pi-book',
      children: [
        { id: 'stgenerate_order', label: 'Generate Order' },
        { id: 'stupload_order', label: 'Upload Order' },
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
