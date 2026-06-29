import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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
  ],
  templateUrl: './inter-bench.component.html',
  styleUrl: './inter-bench.component.scss',
})
export class InterBenchComponent {
  constructor(private fb: FormBuilder) {}
  selectedLocation: string = 'DL';
  // Separate form tracks
  filingForm!: FormGroup;
  form!: FormGroup;
  caseDetailsForm!: FormGroup;

  caseCategoryOptions = [
    { label: 'Case Transfer', value: '1' },
    { label: 'Inter State Transfer', value: '1' },
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
