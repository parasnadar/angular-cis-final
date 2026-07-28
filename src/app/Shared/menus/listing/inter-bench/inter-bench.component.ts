import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { DynamicRadioGroupComponent } from '../../../dynamic-radio-group/dynamic-radio-group.component';
import {
  CustomTableComponent,
  ColumnDef,
} from '../../../custom-table/custom-table.component';
@Component({
  selector: 'app-inter-bench',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    Select,
    ButtonModule,
    InputTextModule,
    FormsModule,
    DynamicRadioGroupComponent,
    CustomTableComponent,
  ],
  templateUrl: './inter-bench.component.html',
  styleUrl: './inter-bench.component.scss',
})
export class InterBenchComponent implements OnInit {
  constructor(private fb: FormBuilder) {}

  caseRecords: any[] = [];
  selectedLocation: string = 'DL';
  // Separate form tracks
  filingForm!: FormGroup;
  form!: FormGroup;
  caseDetailsForm!: FormGroup;

  caseCategoryOptions = [
    { label: 'Case Transfer', value: '1' },
    { label: 'Transfered Cases (Out)', value: '2' },
    { label: 'Transfered In ', value: '3' },
    { label: 'Transfer request from other benches', value: '4' },
    { label: 'Transfer cases (other benches)', value: '5' },
    { label: 'Sent Back Cases', value: '6' },
  ];

  // Track active panel option: 'filing' or 'case'
  activeSearchTab: 'filing' | 'case' = 'filing';
  caseYearOptions: { label: string; value: string }[] = [];

  caseTypeOption = [
    { label: 'Appeal', value: '1' },
    { label: 'Rectification of Mistake', value: '2' },
    { label: 'Condonation of delay', value: '3' },
    { label: 'Mention/Urgent', value: '4' },
  ];

  caseLocationOption = [{ label: 'Delhi', value: '1' }];

  ngOnInit(): void {
    this.loadApiData();
    this.generateYearOptions();
    this.form = this.fb.group({
      caseCategory: ['1'],
    });
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

  tableColumns: ColumnDef[] = [
    { field: 'sNo', header: 'Sr. No.' },
    { field: 'oldFiling', header: 'Old Filing No' },
    { field: 'newFiling', header: 'New Filing No' },
    { field: 'causeTitle', header: 'Cause Title' },
    { field: 'from', header: 'From Bench' },
    { field: 'to', header: 'To Bench' },
    { field: 'request', header: 'Request Initiated' },
    { field: 'last', header: 'Last Updated' },
    { field: 'Transfer_date', header: 'Transfer Date' },
    { field: 'stat', header: 'Status' },
    { field: 'Transfernote', header: 'Transfer Note' },
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
        oldFiling: '2026251201000022',
        newFiling: '2026110101000001',
        causeTitle: 'RAKESH RANJAN PARIDA VS BM, BANGALORE',
        from: 'Delhi (PB)',
        to: 'Delhi',
        request: '19/01/2026 11:23:15',
        last: '',
        Transfer_date: '',
        stat: 'Transferred',
        Transfernote: '',
        diaryNo: 'APL/49/PB/2026',
        caseDetails: '',
        location: 'New Delhi (Principal Bench)',
        date: '28-06-2026',
      },
      {
        sNo: '1',
        oldFiling: '2026251201000022',
        newFiling: '2026110101000001',
        causeTitle: 'RAKESH RANJAN PARIDA VS BM, BANGALORE',
        from: 'Delhi (PB)',
        to: 'Delhi',
        request: '19/01/2026 11:23:15',
        last: '',
        Transfer_date: '',
        stat: 'Transferred',
        Transfernote: '',
        diaryNo: 'APL/49/PB/2026',
        caseDetails: '',
        location: 'New Delhi (Principal Bench)',
        date: '28-06-2026',
      },
      {
        sNo: '1',
        oldFiling: '2026251201000027',
        newFiling: '2026107201000019',
        causeTitle: 'RAKESH RANJAN PARIDA VS TO, Prakash Cbic & Ors.',
        from: 'Delhi (PB)',
        to: 'Delhi',
        request: '11/03/2026 03:32:17',
        last: '',
        Transfer_date: '16/03/2026 03:24:22',
        stat: 'Transferred',
        Transfernote: 'NA',
        diaryNo: 'APL/49/PB/2026',
        caseDetails: '',
        location: 'New Delhi (Principal Bench)',
        date: '28-06-2026',
      },
    ];
  }

  handleRecordView(selectedRow: any): void {
    console.log('Selected case for viewing:', selectedRow);
    alert(`Opening details for case: ${selectedRow.diaryNo}`);
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
    // Map master criteria context on execution submit payload
    const queryPayload = {
      location: this.selectedLocation,
      ...this.filingForm.value,
    };
    console.log('Executing Filing Query Payload:', queryPayload);
  }

  onCaseSearch(): void {
    if (this.caseDetailsForm.invalid) return;
    const queryPayload = {
      location: this.selectedLocation,
      ...this.caseDetailsForm.value,
    };
    console.log('Executing Case Parameter Query Payload:', queryPayload);
  }

  onLocationChange(event: any): void {
    console.log('Global query scope context changed to location:', event.value);
  }

  resetForms(): void {
    this.filingForm.reset();
    this.caseDetailsForm.patchValue({
      caseType: '1',
      caseNo: '',
      caseYear: new Date().getFullYear().toString(),
      caseLocation: '1',
    });
  }
}
