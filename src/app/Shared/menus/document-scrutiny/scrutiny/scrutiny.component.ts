import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Select } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import {
  CustomTableComponent,
  ColumnDef,
  TableAction,
} from '../../../custom-table/custom-table.component';

@Component({
  selector: 'app-scrutiny',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    Select,
    ButtonModule,
    InputTextModule,
    CustomTableComponent,
  ],
  templateUrl: './scrutiny.component.html',
  styleUrl: './scrutiny.component.scss',
})
export class ScrutinyComponent implements OnInit {
  constructor(private fb: FormBuilder) {}

  // Separate form tracks
  filingForm!: FormGroup;
  caseDetailsForm!: FormGroup;

  // Track active panel option: 'filing' or 'case'
  activeSearchTab: 'filing' | 'case' = 'filing';
  caseYearOptions: { label: string; value: string }[] = [];

  caseTypeOption = [
    { label: 'Appeal', value: '1' },
    { label: 'Rectification of Mistake', value: '2' },
    { label: 'Condonation of delay', value: '3' },
    { label: 'Mention/Urgent', value: '4' },
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

  // Search & Loading States
  isLoading: boolean = false;
  hasSearched: boolean = false;

  caseRecords: any[] = [];

  tableColumns: ColumnDef[] = [
    { field: 'sNo', header: 'Sr. No.' },
    { field: 'caseType', header: 'Diary No' },
    { field: 'dateOfFiling', header: 'Date Of Filing' },
    { field: 'caseTitle', header: 'Case No' },
    { field: 'location', header: 'Title Of Case' },
  ];

  onFilingSearch(): void {
    if (this.filingForm.invalid) return;
    console.log('Filing Search Payload:', this.filingForm.value);

    this.isLoading = true;
    this.hasSearched = true;
    this.caseRecords = []; // Clear previous search results while loading

    // Simulated API call (replace setTimeout with your actual API subscription)
    setTimeout(() => {
      this.loadApiData();
      this.isLoading = false;
    }, 1000);
  }

  loadApiData(): void {
    // API response data mapping
    this.caseRecords = [
      {
        sNo: '1',
        caseType: '2026251201000022',
        dateOfFiling: '	29/09/2025',
        caseTitle: 'APPEAL/2(PB)2025',
        location: 'RAKESH RANJAN PARIDA  Vs. VINAY KUMAR SINGH & ORS.',
      },
    ];
  }

  customActions: TableAction[] = [
    {
      label: 'Verify Scrutiny',
      icon: 'pi pi-download',
      url: (row) => `https://example.com/cases/${row.location}/pdf`,
      target: '_blank',
    },
  ];

  handleRecordView(selectedRow: any): void {
    console.log('Selected case for viewing:', selectedRow);
  }

  onCaseSearch(): void {
    if (this.caseDetailsForm.invalid) return;
    console.log('Case Details Search Payload:', this.caseDetailsForm.value);

    this.isLoading = true;
    this.hasSearched = true;
    this.caseRecords = []; // Clear previous search results while loading

    // Simulated API call (replace setTimeout with your actual API subscription)
    setTimeout(() => {
      this.loadApiData();
      this.isLoading = false;
    }, 1000);
  }

  resetForms(): void {
    this.filingForm.reset();
    this.caseDetailsForm.patchValue({
      caseType: '1',
      caseNo: '',
      caseYear: new Date().getFullYear().toString(),
    });

    this.hasSearched = false;
    this.isLoading = false;
    this.caseRecords = [];
  }
}
