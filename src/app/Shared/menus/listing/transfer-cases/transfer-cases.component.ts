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
  selector: 'app-transfer-cases',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DatePickerModule,
    ButtonModule,
    InputTextModule,
    TableModule,
  ],
  templateUrl: './transfer-cases.component.html',
  styleUrl: './transfer-cases.component.scss',
})
export class TransferCasesComponent {
  constructor(private fb: FormBuilder) {}
  form!: FormGroup;

  ngOnInit(): void {
    this.form = this.fb.group({
      listingDate: [null],
    });
  }
}
