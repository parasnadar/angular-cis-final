import { Component, OnInit, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthServiceService } from '../../core/services/auth-service.service';
import { UtilityBarComponent } from '../../Shared/utility-bar/utility-bar.component';
import { ChangePasswordModalComponent } from '../../Shared/change-password-modal/change-password-modal.component';
import { MENU_REGISTRY } from '../../core/menu-registry';
import { Select } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DynamicRadioGroupComponent } from '../../Shared/dynamic-radio-group/dynamic-radio-group.component';
export interface BarOptionItem {
  id: string | number;
  label: string;
  icon?: string;
  children?: BarOptionItem[];
  customMeta?: any;
}
@Component({
  selector: 'app-arbp',
  imports: [
    CommonModule,
    UtilityBarComponent,
    ChangePasswordModalComponent,
    ReactiveFormsModule,
    Select,
    DatePickerModule,
    ButtonModule,
    InputTextModule,
    DynamicRadioGroupComponent,
  ],
  templateUrl: './arbp.component.html',
  styleUrl: './arbp.component.scss',
})
export class ARBPComponent {
  constructor(
    private authService: AuthServiceService,
    private fb: FormBuilder,
  ) {}
  form!: FormGroup;
  isPasswordModalVisible: boolean = false;
  loggedInUser = {
    name: 'Arbp',
    initials: 'A',
  };
  caseCategoryOptions = [
    { label: 'Fresh case for scrutiny', value: 'fresh' },
    { label: 'Defective cases', value: 'defective' },
    { label: 'Refiled Cases', value: 'refiled' },
    { label: 'Return Cases', value: 'return' },
  ];

  caseTypeOptions = [
    { label: 'All', value: 'all' },
    { label: 'Company Appeal', value: 'ca' },
    { label: 'Contempt Petition', value: 'cp' },
  ];

  activeView: string = 'arbphome';
  activeComponentType: Type<any> | null = null; // Holds the current matching component class

  ngOnInit(): void {
    this.loadAssignedMenus();

    this.form = this.fb.group({
      caseCategory: ['fresh'],
      caseType: ['all'],
      diaryFilingNo: [''],
      fromFilingDate: [null],
      toFilingDate: [null],
    });
  }

  gstatViewOptions: BarOptionItem[] = [];
  loadAssignedMenus() {
    this.gstatViewOptions = [
      { id: 'arbphome', label: 'Home', icon: 'pi pi-home' },
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
          { id: 'transfer_cases', label: 'Transfer Cases' },
          { id: 'connect_cases', label: 'Connect Cases' },
          { id: 'disconnect_cases', label: 'Disconnect Cases' },
        ],
      },

      {
        id: 'report',
        label: 'Report',
        icon: 'pi pi-file',
        children: [
          { id: 'mis_report', label: 'Mis Reports' },
          { id: 'search_case', label: 'Search Case' },
          { id: 'defect_notices', label: 'Defect Notices' },
          { id: 'scrutinized_cases', label: 'Scrutinized Cases' },
        ],
      },

      {
        id: 'proceeding',
        label: 'Proceeding',
        icon: 'pi pi-history',
        children: [
          { id: 'case_proceeding', label: 'Case Proceeding' },
          { id: 'case_proceeding_report', label: 'Case Proceeding Report' },
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
        id: 'document_scrutiny',
        label: 'Document Scrutiny',
        icon: 'pi pi-file-check',
        children: [{ id: 'scrutiny', label: 'Scrutiny' }],
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
        id: 'recuse',
        label: 'Recuse',
        icon: 'pi pi-user-minus',
        children: [
          { id: 'recuse_judge_from_case', label: 'Recuse Judge(s) From Case' },
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
    if (selectedId === 'arbphome') {
      this.activeComponentType = null;
    } else {
      this.activeComponentType = MENU_REGISTRY[selectedId] || null;
    }
  }

  onSearch(): void {
    console.log('Executing query payload:', this.form.value);
  }

  onReset(): void {
    this.form.patchValue({
      caseCategory: ['fresh'],
      caseType: 'all',
      diaryFilingNo: '',
      fromFilingDate: null,
      toFilingDate: null,
    });
  }
}
