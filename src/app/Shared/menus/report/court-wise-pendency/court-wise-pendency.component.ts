import { Component } from '@angular/core';
import {
  CustomTableComponent,
  ColumnDef,
} from '../../../custom-table/custom-table.component';
@Component({
  selector: 'app-court-wise-pendency',
  imports: [CustomTableComponent],
  templateUrl: './court-wise-pendency.component.html',
  styleUrl: './court-wise-pendency.component.scss',
})
export class CourtWisePendencyComponent {
  ngOnInit(): void {
    this.loadApiData();
  }
  tableColumns: ColumnDef[] = [
    { field: 'sNo', header: 'Sr. No' },
    { field: 'court', header: 'Court No' },
    { field: 'Appeal', header: 'Appeal' },
    { field: 'NAPA', header: 'NAPA' },
  ];

  caseRecords: any[] = [];
  handleRecordView(selectedRow: any): void {
    console.log('Selected case for viewing:', selectedRow);
    alert(`Opening details for case: ${selectedRow.diaryNo}`);
  }

  loadApiData(): void {
    // Example: Fetching from your API service
    // this.apiService.getCases().subscribe((response) => {
    //   this.caseRecords = response.data;
    // });

    // Dummy fallback for testing
    this.caseRecords = [
      {
        sNo: '1',
        Appeal: '47',
        court: 'Court I',
        NAPA: '40',
      },
      {
        sNo: '2',
        Appeal: '47',
        court: 'Court II',
        NAPA: '0',
      },
      {
        sNo: '3',
        Appeal: '47',
        court: 'Court III',
        NAPA: '0',
      },
      {
        sNo: '4',
        Appeal: '47',
        court: 'Court IV',
        NAPA: '0',
      },
      {
        sNo: '5',
        Appeal: '47',
        court: 'Court II',
        NAPA: '0',
      },
      {
        sNo: '6',
        Appeal: '47',
        court: 'Registrar',
        NAPA: '0',
      },
      {
        sNo: '7',
        Appeal: '47',
        court: 'Court I',
        NAPA: '0',
      },
    ];
  }
}
