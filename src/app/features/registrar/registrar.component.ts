import { Component, inject, OnInit, Type } from '@angular/core';
import { AuthServiceService } from '../../core/services/auth-service.service';
import { UtilityBarComponent } from '../../Shared/utility-bar/utility-bar.component';
import { ChangePasswordModalComponent } from '../../Shared/change-password-modal/change-password-modal.component';
import { MENU_REGISTRY } from '../../core/menu-registry';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
import { InputTextModule } from 'primeng/inputtext';

import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

import {
  ScrutinyTableComponent,
  ScrutinyColumnDef,
} from '../../Shared/scrutiny-table/scrutiny-table.component';
import { Router } from '@angular/router';
import { NotificationService } from '../../core/services/notification.service';
import { DynamicRadioGroupComponent } from '../../Shared/dynamic-radio-group/dynamic-radio-group.component';

export interface ChromaMetricCard {
  id: string;
  tag: string;
  count: number;
  delta: string[];
  secondaryText: string;
  toneClass:
    | 'tone-oceanic'
    | 'tone-sunburst'
    | 'tone-neon-emerald'
    | 'tone-electric-crimson'
    | 'tone-deep-purple'
    | 'tone-electric-cyan';
  iconClass: string;
  actionTarget: string;
  isCritical?: boolean;
}
export interface BarOptionItem {
  id: string | number;
  label: string;
  icon?: string;
  children?: BarOptionItem[];
  customMeta?: any;
}
@Component({
  selector: 'app-registrar',
  standalone: true,
  imports: [
    CommonModule,
    UtilityBarComponent,
    ChangePasswordModalComponent,
    ReactiveFormsModule,
    DatePickerModule,
    ButtonModule,
    InputTextModule,
    ScrutinyTableComponent,
    DialogModule,
    FormsModule,
    DynamicRadioGroupComponent,
  ],
  templateUrl: './registrar.component.html',
  styleUrl: './registrar.component.scss',
})
export class REGISTRARComponent implements OnInit {
  private router = inject(Router);

  selectedCase: any = null;

  // Modals Visibility Flags
  isScrutinyCommentsModalOpen: boolean = false;
  isGenerateCaseModalOpen: boolean = false;
  isReturnToArModalOpen: boolean = false;

  // Form states
  scrutinyCommentsData: any = null; // API data load karne ke liye
  returnArCommentText: string = '';

  // Master Action Switcher
  handleRegistrarAction(action: string, row: any): void {
    this.selectedCase = row;

    switch (action) {
      case 'Scrutiny Comments':
        this.openScrutinyCommentsModal(row);
        break;

      case 'Generate Case No':
        this.isGenerateCaseModalOpen = true;
        break;

      case 'Pre Deposit':
        this.openPreDepositPage(row);
        break;

      case 'Return TO AR':
        this.returnArCommentText = ''; // Reset text
        this.isReturnToArModalOpen = true;
        break;

      default:
        console.warn(`Unknown action: ${action}`);
    }
  }

  // 1. Scrutiny Comments Action
  openScrutinyCommentsModal(row: any): void {
    // Dummy / API fetch simulation
    this.scrutinyCommentsData = {
      caseNo: row.location,
      scrutinizedBy: 'Verification Officer 1',
      date: '31/03/2026',
      notes:
        'All core documents uploaded. Court fee challan matches criteria. Defect check complete.',
    };
    this.isScrutinyCommentsModalOpen = true;
  }

  // 2. Generate Case No Confirmation
  confirmGenerateCaseNo(): void {
    console.log(
      'YES clicked: Case Number Generated Successfully for ->',
      this.selectedCase?.location,
    );
    // API trigger for generation yahan aayega
    this.isGenerateCaseModalOpen = false;
    this.notify.showSuccess('Case Number Generated Successfully');
  }

  // 3. Pre Deposit Page Navigation
  openPreDepositPage(row: any): void {
    const urlTree = this.router.createUrlTree(['/pre-deposit', row.location]);
    const url = this.router.serializeUrl(urlTree);
    window.open(url, '_blank');
  }

  // 4. Return to AR Submission
  submitReturnToAr(): void {
    console.log(
      'Returned to AR for Case:',
      this.selectedCase?.location,
      'with comment:',
      this.returnArCommentText,
    );
    // API trigger yahan aayega
    this.isReturnToArModalOpen = false;
    this.notify.showSuccess('Case returned sucessfully.');
  }
  activeDisplayMode: 'grid' | 'visual' = 'grid';

  // Master Data Stream Container Array
  metricsDataList: ChromaMetricCard[] = [];
  registrarRecords: any[] = [];

  ngOnInit(): void {
    this.fetchTribunalMetricsPayload();
    this.loadRegistrarData();
    this.form = this.fb.group({
      caseCategory: ['1'],

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

      fromFilingDate: null,
      toFilingDate: null,
    });
  }
  loadRegistrarData(): void {
    this.registrarRecords = [
      {
        sNo: '1',
        diaryNo: '30/03/2026 05:11 PM',
        caseDetails: 'Appeal',
        location: '2026251201000102',
        personName: 'SIDDHARTHA GUPTA', // (XYZ) name under filing no.
        date: 'NA',
        TITLE: 'try VS SAURABH, BO, DELHI & Ors.',
        fromCourt: '',
        // Array of actions (API response pattern ready)
        availableActions: [
          'Scrutiny Comments',
          'Generate Case No',
          'Pre Deposit',
          'Return TO AR',
        ],
      },
    ];
  }

  getRowClass = (row: any): string => {
    return 'row-tint-registrar-blue';
  };

  fetchTribunalMetricsPayload(): void {
    this.metricsDataList = [
      {
        id: 'c1',
        tag: 'Case Number Generation',
        count: 100,
        delta: ['+12% Delta', 'Instant Run'],
        secondaryText: 'Awaiting automatic indexing routine',
        toneClass: 'tone-oceanic',
        iconClass: 'pi-cog',
        actionTarget: 'fresh_cases',
      },
      {
        id: 'c2',
        tag: 'Refiled Cases Log',
        count: 32,
        delta: ['+8% Growth', 'Checked'],
        secondaryText: 'Resubmitted petitions pending verification',
        toneClass: 'tone-electric-cyan',
        iconClass: 'pi-replay',
        actionTarget: 'fresh_cases',
      },
      {
        id: 'c3',
        tag: 'For Defect Notice',
        count: 41,
        delta: ['Action Required', 'High Priority'],
        secondaryText: 'Validation failures flagged by system scrutiny',
        toneClass: 'tone-sunburst',
        iconClass: 'pi-file-excel',
        actionTarget: 'fresh_cases',
      },
      {
        id: 'c4',
        tag: 'Action Due Ledgers',
        count: 142,
        delta: ['24h Deadline', 'Review Required'],
        secondaryText: 'Statutory compliance limits approaching',
        toneClass: 'tone-deep-purple',
        iconClass: 'pi-list',
        actionTarget: 'fresh_cases',
      },
      {
        id: 'c5',
        tag: 'Appeals for First Listing',
        count: 38,
        delta: ['14 Overdue', 'Urgent Action'],
        secondaryText: 'Requires definitive order bench assignments',
        toneClass: 'tone-sunburst',
        iconClass: 'pi-sort-alt',
        actionTarget: 'fresh_cases',
      },
      {
        id: 'c6',
        tag: 'Applications for First Listing',
        count: 150,
        delta: ['Sync Ready', 'Rosters Live'],
        secondaryText: 'Verified records locked for automated rosters',
        toneClass: 'tone-neon-emerald',
        iconClass: 'pi-check-square',
        actionTarget: 'fresh_cases',
      },
      {
        id: 'c7',
        tag: 'Unscheduled Listing Pool',
        count: 9,
        delta: ['Critical Load', 'Escalated'],
        secondaryText: 'Immediate court clearance sequence requested',
        toneClass: 'tone-electric-crimson',
        iconClass: 'pi-bolt',
        isCritical: true,
        actionTarget: 'fresh_cases',
      },
      {
        id: 'c8',
        tag: 'Draft Notices Validation',
        count: 18,
        delta: ['Pending Release', '9 Drafts'],
        secondaryText: 'Automated legal notices awaiting signature validation',
        toneClass: 'tone-deep-purple',
        iconClass: 'pi-envelope',
        actionTarget: 'fresh_cases',
      },
      {
        id: 'c9',
        tag: 'Pending Proceeding Transcripts',
        count: 7,
        delta: ['Steno Syncing', 'In Review'],
        secondaryText: 'Daily hearing notes awaiting final review log',
        toneClass: 'tone-electric-cyan',
        iconClass: 'pi-hourglass',
        actionTarget: 'fresh_cases',
      },
      {
        id: 'c10',
        tag: 'Draft Cause List Verification',
        count: 11,
        delta: ['Benches Ready', 'Locked'],
        secondaryText: 'Proposed daily schedule matrix preview generated',
        toneClass: 'tone-neon-emerald',
        iconClass: 'pi-table',
        actionTarget: 'notice_lists',
      },
      {
        id: 'c11',
        tag: 'Inter-Bench Case Transfers',
        count: 4,
        delta: ['External Sync', 'Approval Needed'],
        secondaryText: 'Cross-bench transfer requests requiring authorization',
        toneClass: 'tone-electric-crimson',
        iconClass: 'pi-arrows-h',
        isCritical: true,
        actionTarget: 'fresh_cases',
      },
    ];
  }

  setDisplayMode(mode: 'grid' | 'visual'): void {
    this.activeDisplayMode = mode;
  }
  constructor(
    private authService: AuthServiceService,
    private notify: NotificationService,
    private fb: FormBuilder,
  ) {}
  form!: FormGroup;
  caseCategoryOptions = [
    { label: 'Case No Generation', value: '1' },
    { label: 'Refiled Cases', value: '2' },
    { label: 'Defective cases', value: '3' },
    { label: 'Defective Cases Sent', value: '4' },
    { label: 'No action taken by user', value: '5' },
    { label: 'Defective Docs/Cross Objection', value: '6' },
  ];

  isPasswordModalVisible: boolean = false;
  public visible: boolean = false;
  loggedInUser = {
    name: 'Registrar',
    initials: 'R',
  };
  activeView: string = 'dashboard';
  activeComponentType: Type<any> | null = null;
  gstatViewOptions: BarOptionItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: 'pi pi-objects-column' },
    {
      id: ' registrarhome',
      label: 'Home',
      icon: 'pi pi-objects-column',
    },
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
        { id: 'old_case_listing', label: 'Old Case Listing' },
        { id: 'inter_bench', label: 'Inter Bench' },
      ],
    },
    {
      id: 'report',
      label: 'Report',
      icon: 'pi pi-file',
      children: [
        { id: 'order_report', label: 'Order Report' },
        { id: 'mis_report', label: 'Mis Reports' },
        { id: 'finilized_cause_list', label: 'Finalized Causelist Calendar' },
        { id: 'efiled_cases', label: 'Efiled Cases' },
        { id: 'accepted', label: 'APL 02A Part B Accepted' },
        { id: 'date_wise_pendency', label: 'Date-wise pendency' },
        { id: 'rejected', label: 'APL 02A Part B Rejected' },
        { id: 'court_wise_pendency', label: 'Court-wise pendency' },
        { id: 'proceeding_calender', label: 'Proceeding Calender' },
        { id: 'case_status', label: 'Case Status' },
        { id: 'notification_report', label: 'Notification Report' },
      ],
    },

    {
      id: 'proceeding',
      label: 'Proceeding',
      icon: 'pi pi-history',
      children: [
        { id: 'case_proceeding', label: 'Case Proceeding' },
        { id: 'unscheduled_listing', label: 'Unscheduled Listing' },
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
      id: 'order',
      label: 'Order',
      icon: 'pi pi-book',
      children: [
        { id: 'generate_order', label: 'Generate Order' },
        { id: 'upload_order', label: 'Upload Order' },
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

    {
      id: 'report',
      label: 'Report',
      icon: 'pi pi-file',
      children: [{ id: 'sms_report', label: 'SMS Report' }],
    },
    {
      id: 'scrutiny',
      label: 'Scrutiny',
      icon: 'pi pi-megaphone',
      children: [
        { id: 'places_of_supply_accepted', label: 'Place of Supply Accepted' },
        {
          id: 'places_of_supply_defect_list',
          label: 'Place of Supply Defect List',
        },
      ],
    },
    {
      id: 'display_board',
      label: 'Display Board',
      icon: 'pi pi-megaphone',
      children: [
        {
          id: 'consolidated_display_board',
          label: 'Consolidated Display Board',
        },
        { id: 'display_board', label: 'Display Board' },
      ],
    },
    {
      id: 'restore_case',
      label: 'Restore Case',
      icon: 'pi pi-megaphone',
      children: [
        { id: 'restore_case', label: 'Restore Case' },
        { id: 'restored_cases', label: 'Restored Cases' },
      ],
    },
    {
      id: 'listing',
      label: 'Listing',
      icon: 'pi pi-megaphone',
      children: [
        {
          id: 'list_with_defect_documents',
          label: 'List With Defect Documents',
        },
        { id: 'recused_cases_list', label: 'Recused Cases List' },
      ],
    },
    {
      id: 'masters',
      label: 'Masters',
      icon: 'pi pi-megaphone',
      children: [
        { id: 'actions_for_status', label: 'Actions For Status' },
        { id: 'designation_master', label: 'Designation Master' },
        { id: 'purpose_master', label: 'Purpose Master' },
        { id: 'upload_napa_doc', label: 'Upload NAPA Doc' },
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
    const selectedId = (
      event.child ? (event.child.id as string) : (event.parent.id as string)
    ).trim(); // trim safe rakhega

    this.activeView = selectedId;

    // Jab dashboard ya registrarhome ho, dynamic component outlet null rahega
    if (selectedId === 'dashboard' || selectedId === 'registrarhome') {
      this.activeComponentType = null;
    } else {
      this.activeComponentType = MENU_REGISTRY[selectedId] || null;
    }
  }

  handleCardNavigation(targetView: string): void {
    if (!targetView) return;

    this.activeView = targetView;
    this.activeComponentType = MENU_REGISTRY[targetView] || null;
    console.log(
      `Command Center moving pipeline layout stream to: ${targetView}`,
    );

    // Optional: Trigger a success notification banner drop here if needed
  }

  registrarColumns: ScrutinyColumnDef[] = [
    { field: 'sNo', header: 'Sr No.', width: '5%' },
    { field: 'diaryNo', header: 'Date Of Filing', width: '12%' },
    { field: 'caseDetails', header: 'Case Type', width: '8%' },
    { field: 'location', header: 'Diary/Filing No.', width: '15%' },
    { field: 'date', header: 'Main Case Diary/Filing No.', width: '13%' },
    { field: 'TITLE', header: 'Title Of Case', width: '22%' },
    { field: 'fromCourt', header: 'From Court', width: '8%' },
    { field: 'Action', header: 'Action', width: '15%', align: 'center' },
  ];
}
