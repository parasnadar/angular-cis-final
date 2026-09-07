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
import {
  CustomTableComponent,
  ColumnDef,
  TableAction,
} from '../../Shared/custom-table/custom-table.component';
import { Router } from '@angular/router';
import { Action } from 'rxjs/internal/scheduler/Action';
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
    CustomTableComponent,
  ],
  templateUrl: './scrunity.component.html',
  styleUrl: './scrunity.component.scss',
})
export class SCRUNITYComponent {
  private router = inject(Router);

  caseRecords: any[] = [];
  tableColumns: ColumnDef[] = [
    { field: 'sNo', header: 'Sr. No.', width: '8%' },
    { field: 'diaryNo', header: 'Date Of Filing.' },
    { field: 'caseDetails', header: 'Case Type' },
    { field: 'location', header: 'Diary/Filing No.' },
    { field: 'date', header: 'Main Case Diary/Filing No.' },
    { field: 'TITLE', header: 'Title Of Case' },
    { field: 'CAT', header: 'Categories' },
    { field: 'Action', header: 'Action' },
  ];

  loadApiData(): void {
    // Example: Fetching from your API service
    // this.apiService.getCases().subscribe((response) => {
    //   this.caseRecords = response.data;
    // });

    // Dummy fallback for testing
    this.caseRecords = [
      {
        sNo: '1',
        diaryNo: '03/10/2025 02:22 PM',
        caseDetails: 'Appeal',
        location: '2025257101000009',
        date: 'NA',
        TITLE:
          'Abhi Shek Gstat VS RAKESH RANJAN PARIDA, Designation, 201 Neeladri EC TNMAD 625001',
        CAT: '1. Incorrect determination of value of supply of goods or services or both',
        Action: 'Self Assigned',
      },
    ];
  }
  handleRecordView(selectedRow: any): void {
    console.log('Selected case for viewing:', selectedRow);
    alert(`Opening details for case: ${selectedRow.diaryNo}`);
  }

  customActions: TableAction[] = [
    {
      label: 'Scrutiny',
      icon: 'pi pi-external-link',
      action: (row) => {
        // 1. Angular route se dynamic URL path generate karein
        const urlTree = this.router.createUrlTree([
          '/cases',
          row.location,
          'details',
        ]);
        const url = this.router.serializeUrl(urlTree);

        // 2. Naye tab me open karein
        window.open(url, '_blank');
      },
    },
  ];
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
