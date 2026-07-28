import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Select } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DatePickerModule } from 'primeng/datepicker';

@Component({
  selector: 'app-old-case-listing',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    DatePickerModule,
  ],
  templateUrl: './old-case-listing.component.html',
  styleUrl: './old-case-listing.component.scss',
})
export class OldCaseListingComponent {
  constructor(private fb: FormBuilder) {}
  oldCaseList!: FormGroup;

  ngOnInit(): void {
    // Form 1: Filing Number Tracking Only
    this.oldCaseList = this.fb.group({
      listingDate: [null, [Validators.required]],
    });
  }

  onFilingSearch(): void {
    if (this.oldCaseList.invalid) return;
    console.log('Filing Search Payload:', this.oldCaseList.value);
  }

  resetForms(): void {
    this.oldCaseList.reset();
  }

  isFieldInvalid(fieldName: string): boolean {
    const control = this.oldCaseList.get(fieldName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}
