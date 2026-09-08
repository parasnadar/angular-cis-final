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
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DynamicRadioGroupComponent } from '../../Shared/dynamic-radio-group/dynamic-radio-group.component';

import { ScrutinyTableComponent } from '../../Shared/scrutiny-table/scrutiny-table.component';
import { Router } from '@angular/router';
import { NotificationService } from '../../core/services/notification.service';
import { Dialog } from 'primeng/dialog';
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
  asPerScrutiny: 'YES' | 'NO';
  commentsOfScrutiny?: string;
  isCommentInvalid?: boolean;
}
export interface DefectOption {
  id: string;
  label: string;
  subDocuments?: { id: string; name: string; selected?: boolean }[];
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
    Dialog,
    FormsModule,
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
    this.notify.showSuccess('Diary Number assigned successfully');
  }

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
      commentsOfScrutiny: '',
    },
    {
      srNo: 2,
      description:
        'Has the order appealed against (i.e., the order of the Appellate/Revisional authority) been uploaded with a self-certified copy?',
      asPerAppellant: 'YES',
      commentsOfAppellant: 'Y',
      asPerScrutiny: 'YES',
      commentsOfScrutiny: '',
    },
    {
      srNo: 3,
      description:
        'Has the order passed by the proper officer (i.e., the order against which the appeal before the appellate authority was preferred under section 107/the order that has been revised under section 108) been uploaded with a self-certified copy?',
      asPerAppellant: 'YES',
      commentsOfAppellant: 'Y',
      asPerScrutiny: 'YES',
      commentsOfScrutiny: '',
    },
    {
      srNo: 4,
      description:
        'Have any notices issued by the appellate/revisional authority been uploaded with a self-certified copy?',
      asPerAppellant: 'YES',
      commentsOfAppellant: 'Y',
      asPerScrutiny: 'YES',
      commentsOfScrutiny: '',
    },
    {
      srNo: 5,
      description:
        'Have any show cause notices/statements issued by the proper officer (the authority referred to in the point 3) been uploaded with a self-certified copy?',
      asPerAppellant: 'YES',
      commentsOfAppellant: 'Y',
      asPerScrutiny: 'YES',
      commentsOfScrutiny: '',
    },
    {
      srNo: 6,
      description:
        'If any orders/notices/statements were passed in a language other than English, has an English translation been uploaded?',
      asPerAppellant: 'YES',
      commentsOfAppellant: 'Y',
      asPerScrutiny: 'YES',
      commentsOfScrutiny: '',
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
    return this.checklistItems.every((item) => item.asPerScrutiny === 'YES');
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
    if (item.asPerScrutiny === 'NO') {
      item.isCommentInvalid = !item.commentsOfScrutiny?.trim();
    } else {
      item.isCommentInvalid = false;
    }
  }

  onCommentChange(item: ChecklistItem): void {
    if (item.asPerScrutiny === 'NO') {
      item.isCommentInvalid = !item.commentsOfScrutiny?.trim();
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
        (item) => item.asPerScrutiny === 'NO',
      ),
      fullChecklist: this.checklistItems,
    };
  }

  // ================= BUTTON ACTION LOGGERS =================
  proceedFurther(): void {
    console.log('--- ACTION TRIGGERED: PROCEED FURTHER ---');
    console.log(this.getSubmissionPayload());
  }

  submitDefective(): void {
    // Validate empty comments for NO items
    const hasInvalidComments = this.checklistItems.some(
      (item) => item.asPerScrutiny === 'NO' && !item.commentsOfScrutiny?.trim(),
    );

    if (hasInvalidComments) {
      alert('Please fill mandatory comments for all items marked as NO.');
      return;
    }

    if (!this.selectedDefectCategoryIds.length) {
      alert('Please select at least one Defect Category.');
      return;
    }

    console.log('--- ACTION TRIGGERED: SUBMIT DEFECTIVE REPORT ---');
    console.log(this.getSubmissionPayload());
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
