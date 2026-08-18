import { Component } from '@angular/core';
import { DynamicRadioGroupComponent } from '../../../dynamic-radio-group/dynamic-radio-group.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-with-defect-documents',
  imports: [CommonModule, ReactiveFormsModule, DynamicRadioGroupComponent],
  templateUrl: './list-with-defect-documents.component.html',
  styleUrl: './list-with-defect-documents.component.scss',
})
export class ListWithDefectDocumentsComponent {
  constructor(private fb: FormBuilder) {}
  defectlistform!: FormGroup;
  caseCategoryOptions = [
    { label: 'Cross Objection', value: '1' },
    { label: 'Additional Documents', value: '2' },
  ];
  ngOnInit(): void {
    this.defectlistform = this.fb.group({
      caseCategory: ['1'],
    });
  }
}
