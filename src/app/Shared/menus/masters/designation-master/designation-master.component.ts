import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { DatePickerModule } from 'primeng/datepicker';
import { NotificationService } from '../../../../core/services/notification.service';
import { TextareaModule } from 'primeng/textarea';

@Component({
  selector: 'app-designation-master',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    DatePickerModule,
    TextareaModule,
  ],
  templateUrl: './designation-master.component.html',
  styleUrl: './designation-master.component.scss',
})
export class DesignationMasterComponent {
  designationMasterForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private notify: NotificationService,
  ) {}

  ngOnInit(): void {
    this.initializeActionForm();
  }

  isFieldInvalid(fieldName: string): boolean {
    const control = this.designationMasterForm.get(fieldName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  initializeActionForm(): void {
    this.designationMasterForm = this.fb.group({
      nameOfDesignation: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.designationMasterForm.invalid) {
      this.designationMasterForm.markAllAsTouched();
      return;
    }

    // Capture the read-only presiding member control along with active raw values
    const formPayload = this.designationMasterForm.getRawValue();

    console.log('Form submission successful. Sending payload:', formPayload);
    this.notify.showSuccess('Desigation Added Successfully !!!');
    this.designationMasterForm.reset();
  }
}
