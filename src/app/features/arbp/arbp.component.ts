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
  FormsModule,
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
import { NotificationService } from '../../core/services/notification.service';
export interface BarOptionItem {
  id: string | number;
  label: string;
  icon?: string;
  children?: BarOptionItem[];
  customMeta?: any;
}
export interface BORemarkItem {
  sn: number | string;
  parameter: string;
  inputFromBO?: string | null;
  remark?: string | null;
}
export interface ChecklistItem {
  srNo: number;
  description: string;
  asPerAppellant: string;
  commentsOfAppellant?: string;
  asPerScrutiny?: string;
  commentsOfScrutiny?: string;
  asPerAR: 'YES' | 'NO';
  commentsOfAR?: string;
  isCommentInvalid?: boolean;
}
export interface DefectOption {
  id: string;
  label: string;
  subDocuments?: { id: string; name: string; selected?: boolean }[];
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
    FormsModule,
  ],
  templateUrl: './arbp.component.html',
  styleUrl: './arbp.component.scss',
})
export class ARBPComponent {
  private router = inject(Router);
  constructor(
    private authService: AuthServiceService,
    private fb: FormBuilder,
    private notify: NotificationService,
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

  boRemarksList: BORemarkItem[] = [
    {
      sn: 1,
      parameter:
        'Is Impunged order (APL-04/APL-02 Rejected/ RVN) verified/updated?',
      inputFromBO: null,
      remark: null,
    },
    {
      sn: 2,
      parameter:
        'Is GSTAT pre-deposit payment verified from common portal(GSTN) ?',
      inputFromBO: null,
      remark: null,
    },
    {
      sn: 3,
      parameter: 'Is the appeal filed in correct jurisdiction?',
      inputFromBO: 'NA',
      remark: 'NA',
    },
  ];

  // Component ke andar
  onViewQuickLink(sectionKey: string): void {
    const caseId = '2025257101000020'; // dynamic case/filing ID
    console.log(`Opening view for: ${sectionKey} of case: ${caseId}`);

    // Naye tab me open karne ke liye router tree ya direct URL
    const urlTree = this.router.createUrlTree([
      '/case-docket',
      caseId,
      sectionKey,
    ]);
    window.open(this.router.serializeUrl(urlTree), '_blank');
  }

  checklistItems: ChecklistItem[] = [
    {
      srNo: 1,
      description: 'Has the Appeal been prepared in English?',
      asPerAppellant: 'YES',
      commentsOfAppellant: 'Y',
      asPerScrutiny: 'YES',
      commentsOfScrutiny: 'NO',
      asPerAR: 'YES',
      commentsOfAR: '',
    },
    {
      srNo: 2,
      description:
        'Has the order appealed against (i.e., the order of the Appellate/Revisional authority) been uploaded with a self-certified copy?',
      asPerAppellant: 'YES',
      commentsOfAppellant: 'Y',
      asPerScrutiny: 'YES',
      commentsOfScrutiny: ' ',
      asPerAR: 'YES',
      commentsOfAR: '',
    },
    {
      srNo: 3,
      description:
        'Has the order passed by the proper officer (i.e., the order against which the appeal before the appellate authority was preferred under section 107/the order that has been revised under section 108) been uploaded with a self-certified copy?',
      asPerAppellant: 'YES',
      commentsOfAppellant: 'Y',
      asPerScrutiny: 'YES',
      commentsOfScrutiny: 'NO',
      asPerAR: 'YES',
      commentsOfAR: '',
    },
    {
      srNo: 4,
      description:
        'Have any notices issued by the appellate/revisional authority been uploaded with a self-certified copy?',
      asPerAppellant: 'YES',
      commentsOfAppellant: 'Y',
      asPerScrutiny: 'YES',
      commentsOfScrutiny: 'NO',
      asPerAR: 'YES',
      commentsOfAR: '',
    },
    {
      srNo: 5,
      description:
        'Have any show cause notices/statements issued by the proper officer (the authority referred to in the point 3) been uploaded with a self-certified copy?',
      asPerAppellant: 'YES',
      commentsOfAppellant: 'Y',
      asPerScrutiny: 'YES',
      commentsOfScrutiny: 'NO',
      asPerAR: 'YES',
      commentsOfAR: '',
    },
    {
      srNo: 6,
      description:
        'If any orders/notices/statements were passed in a language other than English, has an English translation been uploaded?',
      asPerAppellant: 'YES',
      commentsOfAppellant: 'Y',
      asPerScrutiny: 'YES',
      commentsOfScrutiny: 'NO',
      asPerAR: 'YES',
      commentsOfAR: '',
    },
    {
      srNo: 7,
      description:
        'If an English translation has been uploaded, has an affidavit confirming the accuracy of the translation been uploaded by the appellant/authorized representative/translator?',
      asPerAppellant: 'YES',
      commentsOfAppellant: 'Y',
      asPerScrutiny: 'YES',
      commentsOfScrutiny: '',
      asPerAR: 'YES',
      commentsOfAR: '',
    },
    {
      srNo: 8,
      description:
        'Have the details of the appellate/revisional authority (designation and office) been correctly and fully specified in the present appeal?',
      asPerAppellant: 'YES',
      commentsOfAppellant: 'Y',
      asPerScrutiny: 'YES',
      commentsOfScrutiny: '',
      asPerAR: 'YES',
      commentsOfAR: '',
    },
    {
      srNo: 9,
      description:
        'Have the details of the officer/authority (as referred to question no.3) who passed the order (designation and office) been correctly and specified filled in the present appeal?',
      asPerAppellant: 'YES',
      commentsOfAppellant: 'Y',
      asPerScrutiny: 'YES',
      commentsOfScrutiny: '',
      asPerAR: 'YES',
      commentsOfAR: '',
    },
    {
      srNo: 10,
      description:
        'Has the order type (of the order referred to in the previous question) been correctly identified in the present appeal?',
      asPerAppellant: 'YES',
      commentsOfAppellant: 'Y',
      asPerScrutiny: 'YES',
      commentsOfScrutiny: '',
      asPerAR: 'YES',
      commentsOfAR: '',
    },
    {
      srNo: 11,
      description:
        'Have the issues under dispute before the Tribunal been clearly stated in the present appeal?',
      asPerAppellant: 'YES',
      commentsOfAppellant: 'Y',
      asPerScrutiny: 'YES',
      commentsOfScrutiny: '',
      asPerAR: 'YES',
      commentsOfAR: '',
    },
    {
      srNo: 12,
      description:
        'Has a case summary of the dispute before the Tribunal been provided in the present appeal?',
      asPerAppellant: 'YES',
      commentsOfAppellant: 'Y',
      asPerScrutiny: 'YES',
      commentsOfScrutiny: '',
      asPerAR: 'YES',
      commentsOfAR: '',
    },
    {
      srNo: 13,
      description:
        'Has a statement of facts regarding the dispute before the Tribunal been included in the present appeal?',
      asPerAppellant: 'YES',
      commentsOfAppellant: 'Y',
      asPerScrutiny: 'YES',
      commentsOfScrutiny: '',
      asPerAR: 'YES',
      commentsOfAR: '',
    },
    {
      srNo: 14,
      description:
        'Have all uploaded documents been digitally signed by the person uploading them?',
      asPerAppellant: 'YES',
      commentsOfAppellant: 'Y',
      asPerScrutiny: 'YES',
      commentsOfScrutiny: '',
      asPerAR: 'YES',
      commentsOfAR: '',
    },
    {
      srNo: 15,
      description:
        'Has the required amount of pre-deposit as per section 112(8) of the CGST Act, 2017, been made?',
      asPerAppellant: 'YES',
      commentsOfAppellant: 'Y',
      asPerScrutiny: 'YES',
      commentsOfScrutiny: '',
      asPerAR: 'YES',
      commentsOfAR: '',
    },
    {
      srNo: 16,
      description:
        'Have the fees as specified in rule 110(5) of the CGST Rules, 2017, been paid?',
      asPerAppellant: 'YES',
      commentsOfAppellant: 'Y',
      asPerScrutiny: 'YES',
      commentsOfScrutiny: '',
      asPerAR: 'YES',
      commentsOfAR: '',
    },
    {
      srNo: 17,
      description:
        'Have all documents been uploaded with correct indexing in a single PDF?',
      asPerAppellant: 'YES',
      commentsOfAppellant: 'Y',
      asPerScrutiny: 'YES',
      commentsOfScrutiny: '',
      asPerAR: 'YES',
      commentsOfAR: '',
    },
    {
      srNo: 18,
      description:
        'Has bookmarking/pagination been done according to the index?',
      asPerAppellant: 'YES',
      commentsOfAppellant: 'Y',
      asPerScrutiny: 'YES',
      commentsOfScrutiny: '',
      asPerAR: 'YES',
      commentsOfAR: '',
    },
    {
      srNo: 19,
      description:
        'Have all documents uploaded been color scanned from the respective originals?',
      asPerAppellant: 'YES',
      commentsOfAppellant: 'Y',
      asPerScrutiny: 'YES',
      commentsOfScrutiny: '',
      asPerAR: 'YES',
      commentsOfAR: '',
    },
    {
      srNo: 20,
      description:
        'Have all documents requiring the signature of the parties been physically signed, scanned, and uploaded?',
      asPerAppellant: 'YES',
      commentsOfAppellant: 'Y',
      asPerScrutiny: 'YES',
      commentsOfScrutiny: '',
      asPerAR: 'YES',
      commentsOfAR: '',
    },
    {
      srNo: 21,
      description:
        'Have all type-written documents uploaded with the present appeal, been typewritten on one side of A4 size paper with double spacing, justified horizontal alignment in the "Times New Roman" font and font size of 12?',
      asPerAppellant: 'YES',
      commentsOfAppellant: 'Y',
      asPerScrutiny: 'YES',
      commentsOfScrutiny: '',
      asPerAR: 'YES',
      commentsOfAR: '',
    },
    {
      srNo: 22,
      description:
        'Are form of Appeal & attached documents are properly paginated and indexed',
      asPerAppellant: 'YES',
      commentsOfAppellant: 'Y',
      asPerScrutiny: 'YES',
      commentsOfScrutiny: '',
      asPerAR: 'YES',
      commentsOfAR: '',
    },
    {
      srNo: 23,
      description: 'Are all affidavits properly attested and identified?',
      asPerAppellant: 'YES',
      commentsOfAppellant: 'Y',
      asPerScrutiny: 'YES',
      commentsOfScrutiny: '',
      asPerAR: 'YES',
      commentsOfAR: '',
    },
    {
      srNo: 24,
      description:
        'Are all documents/enclosures are fully and properly scanned in color and legible',
      asPerAppellant: 'YES',
      commentsOfAppellant: 'Y',
      asPerScrutiny: 'YES',
      commentsOfScrutiny: '',
      asPerAR: 'YES',
      commentsOfAR: '',
    },
    {
      srNo: 25,
      description:
        "Has present appeal been filed under the correct 'category of case' and has the appropriate code been specified therein",
      asPerAppellant: 'YES',
      commentsOfAppellant: 'Y',
      asPerScrutiny: 'YES',
      commentsOfScrutiny: '',
      asPerAR: 'YES',
      commentsOfAR: '',
    },
    {
      srNo: 26,
      description:
        'Whether the amount of demand as per the present appeal is in accordance with the order passed by the appellate authority under section 107',
      asPerAppellant: 'YES',
      commentsOfAppellant: 'Y',
      asPerScrutiny: 'YES',
      commentsOfScrutiny: '',
      asPerAR: 'YES',
      commentsOfAR: '',
    },
    {
      srNo: 27,
      description:
        'Whether the amount admitted before the appellate authority under section 107 as declared in the present appeal is in accordance with the appeal filed before the said authority',
      asPerAppellant: 'YES',
      commentsOfAppellant: 'Y',
      asPerScrutiny: 'YES',
      commentsOfScrutiny: '',
      asPerAR: 'YES',
      commentsOfAR: '',
    },
    {
      srNo: 28,
      description: 'Any other',
      asPerAppellant: 'YES',
      commentsOfAppellant: 'Y',
      asPerScrutiny: 'YES',
      commentsOfScrutiny: '',
      asPerAR: 'YES',
      commentsOfAR: '',
    },
  ];

  defectCategories: DefectOption[] = [
    { id: 'BASIC_DETAILS', label: 'BASIC DETAILS' },
    { id: 'APPELLANT', label: 'APPELLANT' },
    { id: 'RESPONDENT', label: 'RESPONDENT' },
    { id: 'REPRESENTATIVE', label: 'REPRESENTATIVE' },
    {
      id: 'DOCUMENT_UPLOAD',
      label: 'DOCUMENT UPLOAD',
      subDocuments: [
        { id: 'doc1', name: 'Any Other Required Document', selected: true },
        { id: 'doc2', name: 'Appeal / APL07.pdf', selected: false },
      ],
    },
    { id: 'PAYMENT_TRANSACTION', label: 'PAYMENT / TRANSACTION DETAILS' },
    { id: 'CASE_DETAILS', label: 'CASE DETAILS' },
    { id: 'PRE_DEPOSIT', label: 'PRE-DEPOSIT' },
  ];

  selectedDefectCategoryIds: string[] = ['DOCUMENT_UPLOAD'];
  notificationDate: string = '2026-09-08'; // Default ISO date format
  isScrutinyCompleted: boolean = false;
  isReScrutinyVerify: boolean = false;
  selectedUser: string = '';

  userOptions = [
    { label: 'Select User', value: '' },
    { label: 'Verification Officer 1', value: 'VO1' },
    { label: 'Verification Officer 2', value: 'VO2' },
  ];

  get isDefectFree(): boolean {
    return this.checklistItems.every((item) => item.asPerAR === 'YES');
  }

  // Returns all category objects that have sub-documents and are currently selected
  get selectedCategoriesWithDocs(): DefectOption[] {
    return this.defectCategories.filter(
      (c) =>
        this.selectedDefectCategoryIds.includes(c.id) &&
        c.subDocuments &&
        c.subDocuments.length > 0,
    );
  }

  isCategorySelected(catId: string): boolean {
    return this.selectedDefectCategoryIds.includes(catId);
  }

  // Handles single click / Ctrl+click multiple selection toggle
  toggleDefectCategory(catId: string, event: MouseEvent): void {
    const isMultiSelectKey = event.ctrlKey || event.metaKey;

    if (isMultiSelectKey) {
      // Multiple selection toggle on ctrl/cmd press
      if (this.selectedDefectCategoryIds.includes(catId)) {
        this.selectedDefectCategoryIds = this.selectedDefectCategoryIds.filter(
          (id) => id !== catId,
        );
      } else {
        this.selectedDefectCategoryIds = [
          ...this.selectedDefectCategoryIds,
          catId,
        ];
      }
    } else {
      // Simple toggle or multi-select without strictly needing Ctrl
      if (this.selectedDefectCategoryIds.includes(catId)) {
        if (this.selectedDefectCategoryIds.length > 1) {
          this.selectedDefectCategoryIds =
            this.selectedDefectCategoryIds.filter((id) => id !== catId);
        }
      } else {
        this.selectedDefectCategoryIds.push(catId);
      }
    }
  }

  onScrutinyStatusChange(item: ChecklistItem): void {
    if (item.asPerAR === 'NO') {
      item.isCommentInvalid = !item.commentsOfAR?.trim();
    } else {
      item.isCommentInvalid = false;
    }
  }

  onCommentChange(item: ChecklistItem): void {
    if (item.asPerAR === 'NO') {
      item.isCommentInvalid = !item.commentsOfAR?.trim();
    }
  }

  // Helper method to collect the complete payload for consoles
  private getSubmissionPayload(): any {
    const activeCategoriesData = this.defectCategories
      .filter((cat) => this.selectedDefectCategoryIds.includes(cat.id))
      .map((cat) => ({
        categoryId: cat.id,
        categoryLabel: cat.label,
        selectedSubDocuments: cat.subDocuments
          ? cat.subDocuments.filter((doc) => doc.selected).map((d) => d.name)
          : [],
      }));

    return {
      status: this.isDefectFree ? 'DEFECT_FREE' : 'DEFECTIVE',
      notificationDate: this.notificationDate,
      isReScrutinyVerify: this.isReScrutinyVerify,
      isScrutinyCompleted: this.isScrutinyCompleted,
      assignedUser: this.selectedUser,
      selectedDefectsCount: this.selectedDefectCategoryIds.length,
      selectedDefects: activeCategoriesData,
      defectiveChecklistItems: this.checklistItems.filter(
        (item) => item.asPerAR === 'NO',
      ),
      fullChecklist: this.checklistItems,
    };
  }

  // ================= BUTTON ACTION LOGGERS =================

  proceedFurther(): void {
    // Checkbox validation
    if (!this.isScrutinyCompleted) {
      this.notify.showError(
        ' Please check "Scrutiny Completed" before proceeding.',
      );
      return;
    }

    // Assigned User validation
    if (!this.selectedUser || !this.selectedUser.trim()) {
      this.notify.showError(
        ' Please select a user from the dropdown before proceeding.',
      );
      return;
    }

    this.notify.showSuccess(' ACTION TRIGGERED: PROCEED FURTHER');
    console.log(this.getSubmissionPayload());
    this.displayScrunityCheckModal = false;
  }

  submitDefective(): void {
    const hasDocUploadCategory =
      this.selectedDefectCategoryIds.includes('DOCUMENT_UPLOAD');
    const isAnyDocChecked = this.defectCategories
      .find((c) => c.id === 'DOCUMENT_UPLOAD')
      ?.subDocuments?.some((d) => d.selected);

    if (hasDocUploadCategory && !isAnyDocChecked) {
      this.notify.showError(
        ' Document Upload defect marked: Selecting at least one mandatory document is required.',
      );
      return;
    }
    // Validate empty comments for NO items
    const hasInvalidComments = this.checklistItems.some(
      (item) => item.asPerAR === 'NO' && !item.commentsOfAR?.trim(),
    );

    if (hasInvalidComments) {
      this.notify.showError(
        ' Please provide mandatory comments for all checklist items marked as NO.',
      );
      return;
    }

    if (
      !this.selectedDefectCategoryIds ||
      this.selectedDefectCategoryIds.length === 0
    ) {
      this.notify.showError(
        ' Please select at least one Defect Category from "Defects in".',
      );
      return;
    }

    if (!this.isReScrutinyVerify) {
      this.notify.showError(
        ' Please check "Re- Scrutiny Verify" before submitting.',
      );
      return;
    }

    console.log('--- ACTION TRIGGERED: SUBMIT DEFECTIVE REPORT ---');
    console.log(this.getSubmissionPayload());
    this.displayScrunityCheckModal = false;
    this.notify.showSuccess(' ACTION TRIGGERED: SUBMIT DEFECTIVE REPORT');
  }

  returnToClerk(): void {
    console.log('--- ACTION TRIGGERED: RETURN TO SCRUTINY CLERK ---');
    console.log(this.getSubmissionPayload());
  }

  saveAsDraft(): void {
    console.log('--- ACTION TRIGGERED: SAVE AS DRAFT ---');
    console.log(this.getSubmissionPayload());
  }
}
