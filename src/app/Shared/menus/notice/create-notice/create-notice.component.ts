import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Select } from 'primeng/select';

@Component({
  selector: 'app-create-notice',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    Select,
    ButtonModule,
    InputTextModule,
  ],
  templateUrl: './create-notice.component.html',
  styleUrl: './create-notice.component.scss',
})
export class CreateNoticeComponent {
  constructor(private fb: FormBuilder) {}

  // Separate form tracks
  filingForm!: FormGroup;
  caseDetailsForm!: FormGroup;

  // Track active panel option: 'filing' or 'case'
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
    if (this.filingForm.invalid) return;
    console.log('Filing Search Payload:', this.filingForm.value);
  }

  onCaseSearch(): void {
    if (this.caseDetailsForm.invalid) return;
    console.log('Case Details Search Payload:', this.caseDetailsForm.value);
  }

  resetForms(): void {
    this.filingForm.reset();
    this.caseDetailsForm.patchValue({
      caseType: '1',
      caseNo: '',
      caseYear: new Date().getFullYear().toString(),
    });
  }
}
