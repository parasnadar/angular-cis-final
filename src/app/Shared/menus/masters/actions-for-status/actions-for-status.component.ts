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
import { TextareaModule } from 'primeng/textarea';

@Component({
  selector: 'app-actions-for-status',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    Select,
    InputTextModule,
    DatePickerModule,
    TextareaModule,
  ],
  templateUrl: './actions-for-status.component.html',
  styleUrl: './actions-for-status.component.scss',
})
export class ActionsForStatusComponent {
  actionMasterForm!: FormGroup;

  // Master Dropdown Options
  actionOption = [
    { label: 'Pending', value: '1' },
    { label: 'Disposed', value: '2' },
  ];

  constructor(
    private fb: FormBuilder,
    private notify: NotificationService,
  ) {}

  ngOnInit(): void {
    this.initializeActionForm();
  }

  isFieldInvalid(fieldName: string): boolean {
    const control = this.actionMasterForm.get(fieldName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  initializeActionForm(): void {
    this.actionMasterForm = this.fb.group({
      for_action: [null, Validators.required],

      nameOfAction: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.actionMasterForm.invalid) {
      this.actionMasterForm.markAllAsTouched();
      return;
    }

    // Capture the read-only presiding member control along with active raw values
    const formPayload = this.actionMasterForm.getRawValue();

    console.log('Form submission successful. Sending payload:', formPayload);
    this.notify.showSuccess('Action Type Added Successfully !!!');
    this.actionMasterForm.reset();
  }
}
