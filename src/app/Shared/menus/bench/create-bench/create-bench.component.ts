import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormsModule,
  ReactiveFormsModule,
  Validators,
  FormControl,
} from '@angular/forms';
import { Select } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { DatePickerModule } from 'primeng/datepicker';
import { NotificationService } from '../../../../core/services/notification.service';

@Component({
  selector: 'app-create-bench',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    Select,
    InputTextModule,
    DatePickerModule,
  ],
  templateUrl: './create-bench.component.html',
  styleUrl: './create-bench.component.scss',
})
export class CreateBenchComponent implements OnInit {
  benchManagementForm!: FormGroup;

  // Master Dropdown Options
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

  // Dummy pool for selecting bench members
  memberListOptions = [
    { label: 'Honble Justice Alok Verma', value: 'Alok Verma' },
    { label: 'Honble Justice Sanjay Kumar', value: 'Sanjay Kumar' },
    { label: 'Honble Justice Rajesh Bindal', value: 'Rajesh Bindal' },
    { label: 'Honble Justice Priya Sharma', value: 'Priya Sharma' },
    { label: 'Honble Registrar Manoj Dev', value: 'Manoj Dev' },
  ];

  constructor(
    private fb: FormBuilder,
    private notify: NotificationService,
  ) {}

  ngOnInit(): void {
    this.initializeRegistrationForm();
    this.watchBenchNatureChanges();
  }

  initializeRegistrationForm(): void {
    this.benchManagementForm = this.fb.group({
      bench: [null, Validators.required],
      benchNature: [null, Validators.required],
      lastName: ['', Validators.required],
      username: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      gender: [null, Validators.required],
      court: [null, Validators.required],
      mobileNumber: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{10}$')],
      ],

      // Dynamic Section Controls
      specialMemberCount: [null],
      members: this.fb.array([]),
      presidingMember: [{ value: '', disabled: true }],
    });
  }

  // Safe getter for dynamic FormArray members
  get membersArray(): FormArray {
    return this.benchManagementForm.get('members') as FormArray;
  }

  /**
   * Listens to user benchNature selections and formats validations instantly
   */
  watchBenchNatureChanges(): void {
    this.benchManagementForm
      .get('benchNature')
      ?.valueChanges.subscribe((natureValue: string) => {
        this.resetDynamicControls();

        if (natureValue === '1') {
          // Single Bench
          this.addMemberFields(1);
        } else if (natureValue === '2') {
          // Division Bench
          this.addMemberFields(2);
        } else if (natureValue === '3') {
          // Registrar
          this.addMemberFields(1); // One dropdown for Registrar Name
        } else if (natureValue === '4') {
          // Full Bench (4 Members)
          this.addMemberFields(4);
        } else if (natureValue === '5') {
          // Special Bench
          const countControl =
            this.benchManagementForm.get('specialMemberCount');
          countControl?.setValidators([Validators.required, Validators.min(1)]);
          countControl?.updateValueAndValidity();
        }
      });

    // Automatically sync Presiding Member with the first selected member
    this.membersArray.valueChanges.subscribe((values: string[]) => {
      const firstMember = values && values.length > 0 ? values[0] : '';
      this.benchManagementForm
        .get('presidingMember')
        ?.setValue(firstMember || '');
    });
  }

  /**
   * Generates dynamic dropdowns inside the FormArray
   */
  addMemberFields(count: number): void {
    for (let i = 0; i < count; i++) {
      this.membersArray.push(new FormControl(null, Validators.required));
    }
  }

  /**
   * Triggers dynamically when a user types in a custom member limit count
   */
  onSpecialCountInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const value = parseInt(inputElement.value, 10);

    // Clear existing form array controls
    while (this.membersArray.length !== 0) {
      this.membersArray.removeAt(0);
    }

    if (value && value > 0) {
      this.addMemberFields(value);
    }
  }

  resetDynamicControls(): void {
    const countControl = this.benchManagementForm.get('specialMemberCount');
    countControl?.clearValidators();
    countControl?.setValue(null);
    countControl?.updateValueAndValidity();

    while (this.membersArray.length !== 0) {
      this.membersArray.removeAt(0);
    }
    this.benchManagementForm.get('presidingMember')?.setValue('');
  }

  isFieldInvalid(fieldName: string): boolean {
    const control = this.benchManagementForm.get(fieldName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  onRegisterSubmit(): void {
    if (this.benchManagementForm.invalid) {
      this.benchManagementForm.markAllAsTouched();
      return;
    }

    // Capture the read-only presiding member control along with active raw values
    const formPayload = this.benchManagementForm.getRawValue();

    console.log('Form submission successful. Sending payload:', formPayload);
    this.notify.showSuccess('Form submission successful.');

    this.resetDynamicControls();
    this.benchManagementForm.reset();
  }
}
