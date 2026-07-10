import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormsModule,
} from '@angular/forms';

// PrimeNG Imports Needed
import { Select } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-case-status',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    Select,
    InputTextModule,
    ButtonModule,
  ],
  templateUrl: './case-status.component.html',
  styleUrl: './case-status.component.scss',
})
export class CaseStatusComponent implements OnInit {
  constructor(private fb: FormBuilder) {}

  searchForm!: FormGroup;
  caseYearOptions: { label: string; value: string }[] = [];

  // Interactive Captcha Mock Assets
  captchaChallengeText: string = '';
  captchaInputText: string = '';
  captchaValidationFailed: boolean = false;

  // Master Options Arrays
  caseLocationOption = [
    { label: 'New Delhi (Principal Bench)', value: 'DL' },
    { label: 'Mumbai (Western Bench)', value: 'MH' },
    { label: 'Chennai (Southern Bench)', value: 'TN' },
    { label: 'Kolkata (Eastern Bench)', value: 'WB' },
  ];

  searchByOptions = [
    { label: 'Filing/Diary Number', value: '1' },
    { label: 'Party Name Wise', value: '2' },
    { label: 'Advocate Registration', value: '3' },
    { label: 'Court Room List', value: '4' },
  ];

  caseTypeOption = [
    { label: 'Appeal', value: '1' },
    { label: 'Rectification of Mistake', value: '2' },
    { label: 'Condonation of Delay', value: '3' },
    { label: 'Mention/Urgent', value: '4' },
  ];

  ngOnInit(): void {
    this.generateYearOptions();
    this.regenerateCaptchaChallenge();

    this.searchForm = this.fb.group({
      caseLocation: ['DL', Validators.required],
      searchBy: ['1', Validators.required],
      caseType: ['1', Validators.required],
      caseNo: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      caseYear: [new Date().getFullYear().toString(), Validators.required],
      captchaCode: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const control = this.searchForm.get(fieldName);
    return !!(control && control.invalid && (control.dirty || control.touched));
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

  regenerateCaptchaChallenge(): void {
    // Generates a 5-digit secure random verification alpha-numeric code
    const secureChars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Omitted confusing characters like O, 0, I, 1
    let result = '';
    for (let i = 0; i < 5; i++) {
      result += secureChars.charAt(
        Math.floor(Math.random() * secureChars.length),
      );
    }
    this.captchaChallengeText = result;
    this.captchaValidationFailed = false;
    if (this.searchForm) {
      this.searchForm.get('captchaCode')?.setValue('');
    }
  }

  onSubmitSearch(): void {
    if (this.searchForm.invalid) {
      this.searchForm.markAllAsTouched();
      return;
    }

    const userInputCaptcha = this.searchForm
      .get('captchaCode')
      ?.value?.toUpperCase();
    if (userInputCaptcha !== this.captchaChallengeText) {
      this.captchaValidationFailed = true;
      this.searchForm.get('captchaCode')?.setErrors({ incorrect: true });
      return;
    }

    this.captchaValidationFailed = false;
    console.log(
      'Verification Success. Executing query payload:',
      this.searchForm.value,
    );
  }
}
