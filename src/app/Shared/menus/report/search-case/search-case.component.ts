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
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import {
  CustomTableComponent,
  ColumnDef,
} from '../../../custom-table/custom-table.component';

@Component({
  selector: 'app-search-case',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    Select,
    ButtonModule,
    InputTextModule,
    ProgressSpinnerModule,
    CustomTableComponent,
  ],
  templateUrl: './search-case.component.html',
  styleUrl: './search-case.component.scss',
})
export class SearchCaseComponent implements OnInit {
  filingForm!: FormGroup;

  // Search & Loading States
  isLoading: boolean = false;
  hasSearched: boolean = false;

  caseRecords: any[] = [];

  tableColumns: ColumnDef[] = [
    { field: 'sNo', header: 'Sr. No.' },
    { field: 'caseType', header: 'Case Type' },
    { field: 'dateOfFiling', header: 'Date Of Filing' },
    { field: 'caseTitle', header: 'Case Title' },
    { field: 'location', header: 'Location' },
    { field: 'caseStatus', header: 'Case Status' },
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.filingForm = this.fb.group({
      filingNo: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    });
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
    this.caseRecords = []; // Clear previous search results while loading

    // Simulated API call (replace setTimeout with your actual API subscription)
    setTimeout(() => {
      this.loadApiData();
      this.isLoading = false;
    }, 1000);
  }

  resetForms(): void {
    this.filingForm.reset();
    this.hasSearched = false;
    this.isLoading = false;
    this.caseRecords = [];
  }

  handleRecordView(selectedRow: any): void {
    console.log('Selected case for viewing:', selectedRow);
  }

  loadApiData(): void {
    // API response data mapping
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
