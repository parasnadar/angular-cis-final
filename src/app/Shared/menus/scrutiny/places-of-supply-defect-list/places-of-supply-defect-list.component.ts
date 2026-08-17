import { Component } from '@angular/core';
import { DynamicRadioGroupComponent } from '../../../dynamic-radio-group/dynamic-radio-group.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-places-of-supply-defect-list',
  imports: [CommonModule, ReactiveFormsModule, DynamicRadioGroupComponent],
  templateUrl: './places-of-supply-defect-list.component.html',
  styleUrl: './places-of-supply-defect-list.component.scss',
})
export class PlacesOfSupplyDefectListComponent {
  constructor(private fb: FormBuilder) {}
  form!: FormGroup;
  caseCategoryOptions = [
    { label: 'User Accepeted wrong place of supply cases', value: '1' },
    { label: 'User denies wrong place of supply cases', value: '2' },
  ];
  ngOnInit(): void {
    this.form = this.fb.group({
      caseCategory: ['1'],
    });
  }
}
