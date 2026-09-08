import { Component, inject, OnInit, Type } from '@angular/core';
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
import {
  ScrutinyTableComponent,
  ScrutinyColumnDef,
} from '../../Shared/scrutiny-table/scrutiny-table.component';
import { Dialog } from 'primeng/dialog';
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
    ScrutinyTableComponent,
    Dialog,
  ],
  templateUrl: './arbp.component.html',
  styleUrl: './arbp.component.scss',
})
export class ARBPComponent {
  private router = inject(Router);
  constructor(
    private authService: AuthServiceService,
    private fb: FormBuilder,
  ) {}

  caseRecords: any[] = [];
  arbRecords: any[] = [];
  tableColumns: ColumnDef[] = [];
  arbColumns: ScrutinyColumnDef[] = [
    { field: 'sNo', header: 'Sr No.', width: '5%' },
    { field: 'diaryNo', header: 'Date Of Filing', width: '11%' },
    { field: 'caseDetails', header: 'Case Type', width: '12%' },
    { field: 'location', header: 'Diary/Filing No.', width: '15%' },
    { field: 'date', header: 'Main Case Diary/Filing No.', width: '13%' },
    { field: 'TITLE', header: 'Title Of Case', width: '22%' },
    { field: 'CAT', header: 'Categories', width: '14%' },
    { field: 'Action', header: 'Action', width: '8%', align: 'center' },
  ];

  loadArbData(): void {
    this.arbRecords = [
      {
        sNo: '1',
        diaryNo: '03/10/2025 02:22 PM',
        caseDetails: 'Appeal',
        subTag: 'Place of supply',
        location: '2025257101000009',
        docCount: 3,
        date: 'NA',
        TITLE:
          'Abhi Shek Gstat VS RAKESH RANJAN PARIDA, Designation, 201 Neeladri EC TNMAD 625001',
        CAT: '1. Incorrect determination of value of supply of goods or services or both',
        statusBand: 'green',
      },
      {
        sNo: '2',
        diaryNo: '07/10/2025 01:13 PM',
        caseDetails: 'Adjournment Application',
        subTag: '',
        location: '2025307212000184',
        docCount: 2,
        date: '2025307201000182',
        TITLE:
          'Prakash Cbic VS RAKESH RANJAN PARIDA, Designation, 201 Neeladri EC TNMAD 625001',
        CAT: '',
        statusBand: 'green',
      },
      {
        sNo: '3',
        diaryNo: '08/10/2025 04:23 PM',
        caseDetails: 'Appeal',
        subTag: 'Place of supply',
        location: '2025251201000037',
        docCount: 7,
        date: 'NA',
        TITLE: 'Sanjana S Hegde VS PERFTEST, PERFTEST, PERFTEST & Ors.',
        CAT: '1. Misclassification of any goods or services or both',
        statusBand: 'yellow',
      },
      {
        sNo: '4',
        diaryNo: '17/04/2026 02:52 PM',
        caseDetails: 'Appeal',
        subTag: 'Place of supply',
        location: '2026251201000122',
        docCount: 15,
        date: 'NA',
        TITLE: 'RAKESH RANJAN PARIDA VS SAURABH, BO, DELHI & Ors.',
        CAT: '1. Suspension of registration',
        statusBand: 'yellow',
      },
      {
        sNo: '5',
        diaryNo: '06/05/2026 02:41 PM',
        caseDetails: 'Appeal',
        subTag: 'Place of supply',
        location: '2026251201000129',
        docCount: 10,
        date: 'NA',
        TITLE: 'try VS Prakash Cbic, TO, DFSFSF & Ors.',
        CAT: '1. Suspension of registration',
        statusBand: 'yellow',
      },
    ];
  }

  // Arrow function use karein
  getRowClass = (row: any): string => {
    if (row.statusBand === 'green') return 'row-tint-green';
    if (row.statusBand === 'yellow') return 'row-tint-yellow';
    return '';
  };

  displayScrunityCheckModal: boolean = false;
  selectedCaseData: any = null;

  // Table me click trigger hone par
  onScrutinyClick(row: any): void {
    this.selectedCaseData = row;
    this.displayScrunityCheckModal = true;
  }

  onCloseModal(): void {
    this.displayScrunityCheckModal = false;
    this.selectedCaseData = null;
  }

  onProceedModal(): void {
    console.log('Proceed clicked for case:', this.selectedCaseData);
    // Proceed action logic...
    this.displayScrunityCheckModal = false;
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
    this.loadArbData();
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
