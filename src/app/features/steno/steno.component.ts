import { Component, OnInit, Type } from '@angular/core';
import { AuthServiceService } from '../../core/services/auth-service.service';
import { UtilityBarComponent } from '../../Shared/utility-bar/utility-bar.component';
import { ChangePasswordModalComponent } from '../../Shared/change-password-modal/change-password-modal.component';
import { CommonModule } from '@angular/common';
import { MENU_REGISTRY } from '../../core/menu-registry';
export interface BarOptionItem {
  id: string | number;
  label: string;
  icon?: string;
  children?: BarOptionItem[];
  customMeta?: any;
}
@Component({
  selector: 'app-steno',
  imports: [UtilityBarComponent, ChangePasswordModalComponent, CommonModule],
  templateUrl: './steno.component.html',
  styleUrl: './steno.component.scss',
})
export class STENOComponent {
  constructor(private authService: AuthServiceService) {}
  isPasswordModalVisible: boolean = false;

  loggedInUser = {
    name: 'Steno',
    initials: 'S',
  };

  activeView: string = 'sthome';
  activeComponentType: Type<any> | null = null; // Holds the current matching component class

  gstatViewOptions: BarOptionItem[] = [];

  ngOnInit(): void {
    this.loadAssignedMenus();
  }
  loadAssignedMenus() {
    this.gstatViewOptions = [
      { id: 'sthome', label: 'Home', icon: 'pi pi-home' },
      {
        id: 'stcause_list',
        label: 'Causelist',
        icon: 'pi pi-calendar',
        children: [{ id: 'final_causelist', label: 'Final Causelist' }],
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
    const selectedId = event.child
      ? (event.child.id as string)
      : (event.parent.id as string);
    this.activeView = selectedId;
    if (selectedId === 'sthome') {
      this.activeComponentType = null;
    } else {
      this.activeComponentType = MENU_REGISTRY[selectedId] || null;
    }
  }
}
