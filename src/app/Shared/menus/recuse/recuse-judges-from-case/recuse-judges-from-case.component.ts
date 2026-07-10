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

@Component({
  selector: 'app-recuse-judges-from-case',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    Select,
    ButtonModule,
    InputTextModule,
    FormsModule,
  ],
  templateUrl: './recuse-judges-from-case.component.html',
  styleUrl: './recuse-judges-from-case.component.scss',
})
export class RecuseJudgesFromCaseComponent {
  constructor(private fb: FormBuilder) {}

  caseDetailsForm!: FormGroup;

  caseYearOptions: { label: string; value: string }[] = [];

  caseTypeOption = [
    { label: 'Appeal', value: '1' },
    { label: 'Rectification of Mistake', value: '2' },
    { label: 'Condonation of delay', value: '3' },
    { label: 'Mention/Urgent', value: '4' },
  ];

  ngOnInit(): void {
    this.generateYearOptions();

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

  onCaseSearch(): void {
    if (this.caseDetailsForm.invalid) return;
    const queryPayload = {
      ...this.caseDetailsForm.value,
    };
    console.log('Executing Case Parameter Query Payload:', queryPayload);
  }

  resetForms(): void {
    this.caseDetailsForm.patchValue({
      caseType: '1',
      caseNo: '',
      caseYear: new Date().getFullYear().toString(),
    });
  }
}
