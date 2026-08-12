import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import {
  CustomTableComponent,
  ColumnDef,
} from '../../../custom-table/custom-table.component';

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
    CustomTableComponent,
  ],
  templateUrl: './create-notice.component.html',
  styleUrl: './create-notice.component.scss',
})
export class CreateNoticeComponent implements OnInit {
  constructor(private fb: FormBuilder) {}

  isLoading: boolean = false;
  hasSearched: boolean = false;

  // Summary Card details matching the banner layout
  caseSummary: CaseSummaryCard | null = null;
  caseRecords: any[] = [];

  tableColumns: ColumnDef[] = [
    { field: 'sNo', header: 'Sr. No.' },
    { field: 'caseType', header: 'Case Type' },
    { field: 'dateOfFiling', header: 'Date Of Filing' },
    { field: 'caseTitle', header: 'Case Title' },
    { field: 'location', header: 'Location' },
    { field: 'caseStatus', header: 'Case Status' },
  ];

  filingForm!: FormGroup;
  caseDetailsForm!: FormGroup;

  activeSearchTab: 'filing' | 'case' = 'filing';
  caseYearOptions: { label: string; value: string }[] = [];

  caseTypeOption = [
    { label: 'Appeal(APL)', value: '1' },
    { label: 'NAPA(NAPA)', value: '2' },
  ];

  ngOnInit(): void {
    this.generateYearOptions();

    // Form 1: Filing Number Tracking Only
    this.filingForm = this.fb.group({
      filingNo: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    });

    // Form 2: Detailed Case Criteria Tracking
    this.caseDetailsForm = this.fb.group({
      caseType: ['1'],
      caseNo: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      caseYear: [new Date().getFullYear().toString()],
    });
  }

  generateYearOptions(): void {
    const currentYear = new Date().getFullYear();
    const startYear = 1998;
    for (let year = currentYear; year >= startYear; year--) {
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

    this.isLoading = true;
    this.hasSearched = true;
    this.caseSummary = null;
    this.caseRecords = [];

    setTimeout(() => {
      this.loadApiData();
      this.isLoading = false;
    }, 1000);
  }

  onCaseSearch(): void {
    if (this.caseDetailsForm.invalid || this.isLoading) return;

    this.isLoading = true;
    this.hasSearched = true;
    this.caseSummary = null;
    this.caseRecords = [];

    setTimeout(() => {
      this.loadApiData();
      this.isLoading = false;
    }, 1000);
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

  handleRecordView(selectedRow: any): void {
    console.log('Selected case for viewing:', selectedRow);
  }

  loadApiData(): void {
    // Summary Card Details
    this.caseSummary = {
      filingNo: '2026251201000040',
      caseNo: 'Appeal//PB/2026',
      causeTitle: 'try Vs. SAURABH',
      dateOfFiling: '20/01/2026',
    };

    // Table Records
    this.caseRecords = [
      {
        sNo: '1',
        caseType: '2026251201000022',
        dateOfFiling: '2026110101000001',
        caseTitle: 'RAKESH RANJAN PARIDA VS BM, BANGALORE',
        caseStatus: 'Transferred',
        location: 'New Delhi (Principal Bench)',
      },
    ];
  }
}
