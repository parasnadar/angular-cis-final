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
  selector: 'app-scrunity',
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
  templateUrl: './scrunity.component.html',
  styleUrl: './scrunity.component.scss',
})
export class SCRUNITYComponent {
  constructor(
    private authService: AuthServiceService,
    private fb: FormBuilder,
  ) {}
  form!: FormGroup;

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
  isPasswordModalVisible: boolean = false;

  loggedInUser = {
    name: 'Scrunity',
    initials: 'S',
  };

  activeView: string = 'ScrunityHome';
  activeComponentType: Type<any> | null = null; // Holds the current matching component class

  gstatViewOptions: BarOptionItem[] = [];

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

  loadAssignedMenus() {
    this.gstatViewOptions = [
      { id: 'ScrunityHome', label: 'Home', icon: 'pi pi-home' },
      {
        id: 'sreport',
        label: 'Report',
        icon: 'pi pi-file',
        children: [
          { id: 'defect_notices', label: 'Defect Notices' },
          { id: 'scrutinized_notices', label: 'Scrutinized Notices' },
        ],
      },
      {
        id: 'sdocument_scrutiny',
        label: 'Document Scrutiny',
        icon: 'pi pi-file-check',
        children: [{ id: 'sscrutiny', label: 'Scrutiny' }],
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
    if (selectedId === 'ScrunityHome') {
      this.activeComponentType = null;
    } else {
      this.activeComponentType = MENU_REGISTRY[selectedId] || null;
    }
  }
}
