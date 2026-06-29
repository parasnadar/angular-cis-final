import { Component, OnInit, Type } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DatePickerModule } from 'primeng/datepicker';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-final-causelist',
  imports: [
    CommonModule,

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
      court: [''],

      date: [null],
    });
  }

  onSearch(): void {
    console.log('Executing query payload:', this.form.value);
  }
}
