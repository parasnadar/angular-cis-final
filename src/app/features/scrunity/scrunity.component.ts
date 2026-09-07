import { Component, inject, Inject, OnInit, Type } from '@angular/core';
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

import { ScrutinyTableComponent } from '../../Shared/scrutiny-table/scrutiny-table.component';
import { Router } from '@angular/router';
import { NotificationService } from '../../core/services/notification.service';
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
    ScrutinyTableComponent,
  ],
  templateUrl: './scrunity.component.html',
  styleUrl: './scrunity.component.scss',
})
export class SCRUNITYComponent {
  private router = inject(Router);

  caseRecords: any[] = [];
  tableColumns: any[] = [];

  loadApiData(): void {
    // Example: Fetching from your API service
    // this.apiService.getCases().subscribe((response) => {
    //   this.caseRecords = response.data;
    // });

    // Dummy fallback for testing
    this.caseRecords = [
      {
        sNo: '5',
        diaryNo: '11/10/2025 12:37 PM',
        caseDetails: 'Appeal',
        subTag: 'Place of supply',
        location: '2025257101000020',
        docCount: 3,
        date: 'NA',
        TITLE: 'Abhi Shek Gstat VS RAKESH RANJAN PARIDA, Designation...',
        CAT: '1. Incorrect determination of time of supply...',
        actionType: 'scrutiny', // Direct Scrutiny button
      },
      {
        sNo: '6',
        diaryNo: '11/10/2025 01:22 PM',
        caseDetails: 'Review Application',
        location: '2025257106000022',
        docCount: 3,
        date: '2025257101000021',
        TITLE: 'RAKESH RANJAN PARIDA VS RAJAT MISHRA...',
        CAT: '',
        actionType: 'self_assign', // Self Assign button
      },
      {
        sNo: '7',
        diaryNo: '11/10/2025 06:19 PM',
        caseDetails: 'Appeal',
        subTag: 'Place of supply',
        location: '2025307201000190',
        docCount: 8,
        date: 'NA',
        TITLE: 'Megha gupta VS Krishna, TO, Delhi & Ors.',
        CAT: '1. Misclassification of any goods or services...',
        daysPending: 330,
        boNotAssigned: true,
        actionType: 'self_assign', // With badges + Self assign
      },
    ];
  }

  onSelfAssignClick(row: any): void {
    row.actionType = 'scrutiny';
    console.log('Opening popup for row:', row);
    this.notify.showSuccess('Diary number is self assigned ');
  }

  // Scrutiny link click
  onScrutinyClick(row: any): void {
    const urlTree = this.router.createUrlTree([
      '/cases',
      row.location,
      'details',
    ]);
    window.open(this.router.serializeUrl(urlTree), '_blank');
  }

  // Links click
  onDocLinkClick(type: string, row: any): void {
    console.log(`Clicked ${type} for case: ${row.location}`);
  }
  handleRecordView(selectedRow: any): void {
    console.log('Selected case for viewing:', selectedRow);
    alert(`Opening details for case: ${selectedRow.diaryNo}`);
  }

  constructor(
    private authService: AuthServiceService,
    private fb: FormBuilder,
    private notify: NotificationService,
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
    this.loadApiData();
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
          { id: 'scrutinized_cases', label: 'Scrutinized Notices' },
        ],
      },
      {
        id: 'sdocument_scrutiny',
        label: 'Document Scrutiny',
        icon: 'pi pi-file-check',
        children: [{ id: 'scrutiny', label: 'Scrutiny' }],
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
