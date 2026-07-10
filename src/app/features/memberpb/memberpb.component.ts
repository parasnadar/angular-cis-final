import { Component, OnInit, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthServiceService } from '../../core/services/auth-service.service';
import { UtilityBarComponent } from '../../Shared/utility-bar/utility-bar.component';
import { ChangePasswordModalComponent } from '../../Shared/change-password-modal/change-password-modal.component';
import { MENU_REGISTRY } from '../../core/menu-registry';
import { DatePickerModule } from 'primeng/datepicker';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DynamicRadioGroupComponent } from '../../Shared/dynamic-radio-group/dynamic-radio-group.component';

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
    UtilityBarComponent,
    ChangePasswordModalComponent,
    ReactiveFormsModule,
    DatePickerModule,
    ButtonModule,
    InputTextModule,
    DynamicRadioGroupComponent,
  ],
  templateUrl: './memberpb.component.html',
  styleUrl: './memberpb.component.scss',
})
export class MEMBERPBComponent {
  constructor(
    private authService: AuthServiceService,
    private fb: FormBuilder,
  ) {}
  form!: FormGroup;
  loggedInUser = {
    name: 'MemberPb',
    initials: 'MB',
  };
  isPasswordModalVisible: boolean = false;

  isDarkMode: boolean = false;

  caseCategoryOptions = [{ label: 'CauseList', value: 'causelist' }];

  activeView: string = 'memberhome';
  activeComponentType: Type<any> | null = null; // Holds the current matching component class

  ngOnInit(): void {
    this.loadAssignedMenus();

    this.form = this.fb.group({
      caseCategory: ['causelist'],
    });
  }

  gstatViewOptions: BarOptionItem[] = [];
  loadAssignedMenus() {
    this.gstatViewOptions = [
      { id: 'memberhome', label: 'Home', icon: 'pi pi-home' },
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
        children: [{ id: 'final_causelist', label: 'Final Causelist' }],
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
        icon: 'pi pi-sync',
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

    // Dynamically look up the component type using the string ID from MENU_REGISTRY
    if (selectedId === 'memberhome') {
      this.activeComponentType = null;
    } else {
      this.activeComponentType = MENU_REGISTRY[selectedId] || null;
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
}
