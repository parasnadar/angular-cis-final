import { Component } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DatePickerModule } from 'primeng/datepicker';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-case-proceeding-report',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DatePickerModule,
    ButtonModule,
    InputTextModule,
    TableModule,
  ],
  templateUrl: './case-proceeding-report.component.html',
  styleUrl: './case-proceeding-report.component.scss',
})
export class CaseProceedingReportComponent {
  constructor(private fb: FormBuilder) {}
  form!: FormGroup;

  ngOnInit(): void {
    this.form = this.fb.group({
      listingDate: [null],
    });
  }

  onSearch(): void {
    console.log('Executing query payload:', this.form.value);
  }
}
