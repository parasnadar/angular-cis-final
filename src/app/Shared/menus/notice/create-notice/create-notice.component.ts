import { Component, OnInit } from '@angular/core';
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
  ],
  templateUrl: './create-notice.component.html',
  styleUrl: './create-notice.component.scss',
})
export class CreateNoticeComponent implements OnInit {
  constructor(private fb: FormBuilder) {}

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

  responOptions = [{ label: 'Rkesh rajan', value: 'court_01' }];

  partyOptions = [
    { label: 'Respondent', value: '1' },
    { label: "Applicant/Appeallant's", value: '2' },
  ];

  notice_type_options = [
    { label: 'Specific Notice', value: '1' },
    { label: 'First notice requiring presence', value: '2' },
    { label: 'Second notice requiring presence', value: '3' },
    { label: 'Third notice requiring presence', value: '4' },
    { label: 'Notice requiring submission of Documents', value: '5' },
  ];

  initializeRegistrationForm(): void {
    this.GenerateNoticeForm = this.fb.group({
      type_notice: [null, Validators.required],
      party_selection: [null, Validators.required],
      hearingDate: [null, Validators.required],
      noticeTime: [null, [Validators.required]],

      respon_list: [null, Validators.required],
    });
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

    // Capture the read-only presiding member control along with active raw values
    const formPayload = this.GenerateNoticeForm.getRawValue();

    console.log('Form submission successful. Sending payload:', formPayload);
  }
}
