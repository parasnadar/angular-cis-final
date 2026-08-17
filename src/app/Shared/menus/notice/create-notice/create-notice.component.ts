import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { DialogModule } from 'primeng/dialog'; // Ensure DialogModule is imported
import {
  CustomTableComponent,
  ColumnDef,
} from '../../../custom-table/custom-table.component';
import { DatePickerModule } from 'primeng/datepicker';
import { FileUpload, FileUploadModule } from 'primeng/fileupload';
import { EditorModule } from 'primeng/editor';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TextareaModule } from 'primeng/textarea';
import Quill from 'quill';
import { NotificationService } from '../../../../core/services/notification.service';

// 1. Register Custom Font Families with Quill
const Font = Quill.import('attributors/class/font') as any;
Font.whitelist = [
  'roboto',
  'inter',
  'georgia',
  'times',
  'arial',
  'inconsolata',
];
Quill.register(Font, true);

// 2. Register Custom Font Sizes
const Size = Quill.import('attributors/style/size') as any;
Size.whitelist = [
  '10px',
  '12px',
  '14px',
  '16px',
  '18px',
  '22px',
  '28px',
  '36px',
];
Quill.register(Size, true);
export interface CaseSummaryCard {
  filingNo: string;
  caseNo: string;
  causeTitle: string;
  dateOfFiling: string;
}

@Component({
  selector: 'app-create-notice',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    Select,
    ButtonModule,
    InputTextModule,
    DialogModule,
    CustomTableComponent,
    DatePickerModule,
    FileUploadModule,
    EditorModule,
    RadioButtonModule,
    TextareaModule,
  ],
  templateUrl: './create-notice.component.html',
  styleUrl: './create-notice.component.scss',
})
export class CreateNoticeComponent implements OnInit {
  @ViewChild('fileUploadRef') fileUploadRef!: FileUpload;
  constructor(
    private fb: FormBuilder,
    private notify: NotificationService,
  ) {}

  ngOnInit(): void {
    this.generateYearOptions();
    this.initializeRegistrationForm();
    this.filingForm = this.fb.group({
      filingNo: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    });
    this.caseDetailsForm = this.fb.group({
      caseType: ['1'],
      caseNo: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      caseYear: [new Date().getFullYear().toString()],
    });
  }

  isLoading: boolean = false;
  hasSearched: boolean = false;

  // Controls Pop-up Modal
  displayNoticeModal: boolean = false;

  caseSummary: CaseSummaryCard | null = null;
  caseRecords: any[] = [];

  tableColumns: ColumnDef[] = [
    { field: 'sNo', header: 'Sr. No.' },
    { field: 'noticeType', header: 'Case Type' },
    { field: 'noticeId', header: 'Date Of Filing' },
    { field: 'caseNo', header: 'Case Title' },
    { field: 'dateOfNotice', header: 'Location' },
  ];

  filingForm!: FormGroup;
  caseDetailsForm!: FormGroup;
  GenerateNoticeForm!: FormGroup;

  activeSearchTab: 'filing' | 'case' = 'filing';
  caseYearOptions: { label: string; value: string }[] = [];
  caseTypeOption = [
    { label: 'Appeal(APL)', value: '1' },
    { label: 'NAPA(NAPA)', value: '2' },
  ];

  generateYearOptions(): void {
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= 1998; year--) {
      this.caseYearOptions.push({
        label: year.toString(),
        value: year.toString(),
      });
    }
  }

  blockNonNumbers(event: KeyboardEvent): boolean {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar) && event.key !== 'Enter') {
      event.preventDefault();
      return false;
    }
    return true;
  }

  onFilingSearch(): void {
    if (this.filingForm.invalid || this.isLoading) return;
    this.executeSearch();
  }

  onCaseSearch(): void {
    if (this.caseDetailsForm.invalid || this.isLoading) return;
    this.executeSearch();
  }

  private executeSearch(): void {
    this.isLoading = true;
    this.hasSearched = true;
    this.caseSummary = null;
    this.caseRecords = [];

    setTimeout(() => {
      this.loadApiData();
      this.isLoading = false;
    }, 800);
  }

  resetForms(): void {
    this.filingForm.reset();
    this.caseDetailsForm.reset();
    this.caseDetailsForm.patchValue({
      caseType: '1',
      caseNo: '',
      caseYear: new Date().getFullYear().toString(),
    });
    this.hasSearched = false;
    this.isLoading = false;
    this.caseSummary = null;
    this.caseRecords = [];
  }

  openGenerateNoticeModal(): void {
    this.displayNoticeModal = true;
  }

  handleRecordView(selectedRow: any): void {
    console.log('Selected case for viewing:', selectedRow);
  }

  loadApiData(): void {
    // Summary Card Details
    this.caseSummary = {
      filingNo: '2026251201000040',
      caseNo: 'Appeal//PB/2026',
      causeTitle: 'RAKESH RANJAN PARIDA vs RAMAN SINGH & Ors.',
      dateOfFiling: '20/01/2026',
    };

    this.caseRecords = [
      {
        sNo: '1',
        noticeType: 'First notice requiring presence',
        noticeId: 'GSTAT/PB/00023/2026',
        caseNo: 'Appeal///2026',
        dateOfNotice: '20/01/2026',
      },
    ];
  }

  // generate notice
  isEditorFullscreen: boolean = false;

  editorWordCount: number = 0;
  editorCharCount: number = 0;
  // --- ADVANCED EDITOR ACTIONS ---

  /** Live Word and Character Counter */
  onEditorTextChange(event: any): void {
    const text = event.textValue || '';
    const cleanText = text.trim();
    this.editorCharCount = cleanText.length;
    this.editorWordCount = cleanText ? cleanText.split(/\s+/).length : 0;
  }

  loadOfficialTemplate(): void {
    const templateHtml = `
      <h2 style="text-align: center;"><strong>BEFORE THE GOODS AND SERVICES TAX APPELLATE TRIBUNAL</strong></h2>
      <p style="text-align: center;"><strong>PRINCIPAL BENCH, NEW DELHI</strong></p>
      <p style="text-align: right;"><strong>Date:</strong> {{Notice_Date}}</p>
      <p><strong>IN THE MATTER OF:</strong></p>
      <p><strong>{{Appellant_Name}}</strong> ... <em>Appellant</em></p>
      <p style="text-align: center;"><strong>VERSUS</strong></p>
      <p><strong>{{Respondent_Name}}</strong> ... <em>Respondent</em></p>
      <hr/>
      <h3 style="text-align: center;"><strong>NOTICE OF HEARING</strong></h3>
      <p>WHEREAS the above-titled appeal has been filed before this Tribunal and has been fixed for preliminary hearing/admission on <strong>{{Hearing_Date}}</strong> at <strong>{{Hearing_Time}}</strong>.</p>
      <p>NOW THEREFORE, take notice that you are hereby required to appear in person or through a duly authorized representative on the date and time mentioned above.</p>
      <br/>
      <p style="text-align: right;"><strong>By Order of the Tribunal</strong><br/>Registrar / Authorized Officer</p>
    `;
    this.GenerateNoticeForm.patchValue({ noticeEditorData: templateHtml });
  }

  insertTag(tag: string): void {
    const currentData =
      this.GenerateNoticeForm.get('noticeEditorData')?.value || '';
    this.GenerateNoticeForm.patchValue({
      noticeEditorData:
        currentData +
        ` <span style="color: #2563eb; font-weight: bold;">{{${tag}}}</span> `,
    });
  }

  toggleEditorFullscreen(): void {
    this.isEditorFullscreen = !this.isEditorFullscreen;
  }
  selectedFileName: string | null = null;
  responOptions = [
    { label: 'Assistant Commissioner, Zone-1', value: '1' },
    { label: 'Joint Commissioner (Appeals)', value: '2' },
  ];

  partyOptions = [
    { label: 'Respondent', value: '1' },
    { label: "Applicant/Appeallant's", value: '2' },
  ];

  notice_type_options = [
    { label: 'First notice Requiring presence', value: '1' },
    { label: 'Second notice Requiring presence', value: '2' },
    { label: 'Third notice Requiring presence', value: '3' },
    { label: 'Specific notice', value: '4' },
    { label: 'Notice requiring submission of Documents', value: '5' },
  ];

  docSubmissionOptions = [
    { label: 'Requiring only Document', value: 'DOC_ONLY' },
    { label: 'Requiring only Person', value: 'PERSON_ONLY' },
    { label: 'Requiring both document and person', value: 'BOTH' },
  ];

  initializeRegistrationForm(): void {
    this.GenerateNoticeForm = this.fb.group({
      type_notice: [null, Validators.required],
      party_selection: [null, Validators.required],
      hearingDate: [null, Validators.required],
      noticeTime: [null, [Validators.required]],
      additionalDoc: [null, Validators.required],
      respon_list: [null, Validators.required],

      // Conditional controls
      wasPersonPresentInFirstNotice: ['no'], // For type 2
      wasCourtAbleToHear: ['no'], // For type 3
      noticeEditorData: [''], // For type 4 (Specific Notice)
      submissionRequirement: [''], // For type 5
      listOfDocuments: [''], // For type 5
    });
  }

  onFileSelect(event: any): void {
    if (event.files && event.files.length > 0) {
      const file = event.files[0];
      this.selectedFileName = file.name;
      this.GenerateNoticeForm.patchValue({ additionalDoc: file });
      this.GenerateNoticeForm.get('additionalDoc')?.markAsDirty();
    }
  }

  removeSelectedFile(): void {
    this.selectedFileName = null;
    this.GenerateNoticeForm.patchValue({ additionalDoc: null });
    this.GenerateNoticeForm.get('additionalDoc')?.markAsTouched();

    // Clears PrimeNG internal file buffer and label
    if (this.fileUploadRef) {
      this.fileUploadRef.clear();
    }
  }
  isFieldInvalid(fieldName: string): boolean {
    const control = this.GenerateNoticeForm.get(fieldName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
  onRegisterSubmit(): void {
    if (this.GenerateNoticeForm.invalid) {
      this.GenerateNoticeForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    const formPayload = this.GenerateNoticeForm.getRawValue();

    console.log('Form submission successful. Sending payload:', formPayload);

    setTimeout(() => {
      // 1. Success Toast Notification
      this.notify.showSuccess('Notice Generation Successfully');

      // 2. Refresh/Reset everything
      this.resetModalState();

      // 3. Close the Modal
      this.displayNoticeModal = false;
      this.isLoading = false;
    }, 600);
  }

  /** Complete cleanup for forms, upload buffers, and editor state */
  resetModalState(): void {
    // Form reset to default values
    this.GenerateNoticeForm.reset({
      type_notice: '',
      party_selection: '',
      wasPersonPresentInFirstNotice: 'no',
      wasCourtAbleToHear: 'no',
      noticeEditorData: '',
      submissionRequirement: '',
      listOfDocuments: '',
      respon_list: '',
      hearingDate: null,
      noticeTime: null,
      additionalDoc: null,
    });

    // Clear file selection & PrimeNG internal upload buffer
    this.selectedFileName = null;
    if (this.fileUploadRef) {
      this.fileUploadRef.clear();
    }

    // Reset editor stats
    this.editorWordCount = 0;
    this.editorCharCount = 0;
    this.isEditorFullscreen = false;
  }

  onCancelModal(): void {
    this.resetModalState();
    this.displayNoticeModal = false;
  }
}
