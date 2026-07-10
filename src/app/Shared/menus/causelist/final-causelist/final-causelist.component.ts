import { Component, OnInit, Type } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DatePickerModule } from 'primeng/datepicker';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Select } from 'primeng/select';

@Component({
  selector: 'app-final-causelist',
  imports: [
    CommonModule,
    Select,
    ReactiveFormsModule,
    DatePickerModule,
    ButtonModule,
    InputTextModule,
  ],
  templateUrl: './final-causelist.component.html',
  styleUrl: './final-causelist.component.scss',
})
export class FinalCauselistComponent {
  constructor(private fb: FormBuilder) {}
  form!: FormGroup;
  ngOnInit(): void {
    this.form = this.fb.group({
      court: ['', Validators.required],

      date: [null, Validators.required],
    });
  }

  onSearch(): void {
    console.log('Executing query payload:', this.form.value);
  }

  courtTypeOptions = [
    { label: 'Court I', value: 'I' },
    { label: 'Court II', value: 'II' },
    { label: 'Court III', value: 'III' },
    { label: 'Court IV', value: 'IV' },
  ];

  isFieldInvalid(fieldName: string): boolean {
    const control = this.form.get(fieldName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}
