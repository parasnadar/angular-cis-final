import { Component, OnInit } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Select } from 'primeng/select';
import { CommonModule } from '@angular/common';
import { DatePickerModule } from 'primeng/datepicker';
import { NotificationService } from '../../../../core/services/notification.service';

@Component({
  selector: 'app-create-bench',
  imports: [
    CommonModule,

    ReactiveFormsModule,
    FormsModule,
    Select,
    DatePickerModule,
  ],
  templateUrl: './create-bench.component.html',
  styleUrl: './create-bench.component.scss',
})
export class CreateBenchComponent {
  constructor(
    private fb: FormBuilder,
    private notify: NotificationService,
  ) {}
  ngOnInit(): void {
    this.initializeRegistrationForm();
  }
  benchManagementForm!: FormGroup;
  benchOption = [{ label: 'Delhi(PB)', value: 'delhi_pb' }];
  genderOptions = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' },
  ];
  benchNatureOptions = [
    { label: 'Single Bench', value: '1' },
    { label: 'Division Bench', value: '2' },
    { label: 'Registrar', value: '3' },
    { label: 'Full Bench', value: '4' },
    { label: 'Special Bench', value: '5' },
  ];
  courtOptions = [
    { label: 'Court Room No. 1 (Division Bench)', value: 'court_01' },
    { label: 'Court Room No. 2 (Single Bench)', value: 'court_02' },
    { label: 'Court Room No. 3 (Registrar Court)', value: 'court_03' },
  ];
  initializeRegistrationForm(): void {
    this.benchManagementForm = this.fb.group({
      bench: [null, Validators.required],
      benchNature: [null, [Validators.required]],
      lastName: ['', Validators.required],
      username: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      gender: [null, Validators.required],
      court: [null, Validators.required],
      mobileNumber: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{10}$')],
      ], // Validates standard 10-digit numeric numbers
    });
  }
  isFieldInvalid(fieldName: string): boolean {
    const control = this.benchManagementForm.get(fieldName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  onRegisterSubmit(): void {
    if (this.benchManagementForm.invalid) {
      this.benchManagementForm.markAllAsTouched(); // Highlights any missed fields automatically
      return;
    }

    console.log(
      'Form submission successful. Sending payload to your API pipe:',
      this.benchManagementForm.value,
    );
    this.notify.showSuccess(
      'Form submission successful. Sending payload to your API pipe:',
    );
    // Execute backend posting operations here. Then reset gracefully:
    this.benchManagementForm.reset();
  }
}
