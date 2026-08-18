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
  selector: 'app-purpose-master',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    DatePickerModule,
    TextareaModule,
  ],
  templateUrl: './purpose-master.component.html',
  styleUrl: './purpose-master.component.scss',
})
export class PurposeMasterComponent {
  purposeMasterForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private notify: NotificationService,
  ) {}

  ngOnInit(): void {
    this.initializeActionForm();
  }

  isFieldInvalid(fieldName: string): boolean {
    const control = this.purposeMasterForm.get(fieldName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  initializeActionForm(): void {
    this.purposeMasterForm = this.fb.group({
      nameOfPurpose: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.purposeMasterForm.invalid) {
      this.purposeMasterForm.markAllAsTouched();
      return;
    }

    // Capture the read-only presiding member control along with active raw values
    const formPayload = this.purposeMasterForm.getRawValue();

    console.log('Form submission successful. Sending payload:', formPayload);
    this.notify.showSuccess('Desigation Added Successfully !!!');
    this.purposeMasterForm.reset();
  }
}
