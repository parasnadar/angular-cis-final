import { Component, OnInit, Type } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DatePickerModule } from 'primeng/datepicker';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Select } from 'primeng/select';

@Component({
  selector: 'app-draft-causelist',
  imports: [
    CommonModule,
    Select,
    ReactiveFormsModule,
    DatePickerModule,
    ButtonModule,
    InputTextModule,
  ],
  templateUrl: './draft-causelist.component.html',
  styleUrl: './draft-causelist.component.scss',
})
export class DraftCauselistComponent {
  constructor(private fb: FormBuilder) {}
  form!: FormGroup;
  ngOnInit(): void {
    this.form = this.fb.group({
      court: [''],

      date: [null],
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
}
