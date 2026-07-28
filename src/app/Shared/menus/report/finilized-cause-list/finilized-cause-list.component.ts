import { Component } from '@angular/core';
import {
  CustomTableComponent,
  ColumnDef,
} from '../../../custom-table/custom-table.component';
@Component({
  selector: 'app-finilized-cause-list',
  imports: [CustomTableComponent],
  templateUrl: './finilized-cause-list.component.html',
  styleUrl: './finilized-cause-list.component.scss',
})
export class FinilizedCauseListComponent {
  ngOnInit(): void {
    this.loadApiData();
  }
  tableColumns: ColumnDef[] = [
    { field: 'sNo', header: 'Sr. No' },
    { field: 'listingDate', header: 'Listing Date' },
    { field: 'court', header: 'Court.' },
    { field: 'listingCases', header: 'Listing Cases' },
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
        listingDate: '01/07/2025',
        court: 'Court I',
        listingCases: '10',
      },
      {
        sNo: '2',
        listingDate: '08/12/2025',
        court: 'Registrar Court',
        listingCases: '11',
      },
      {
        sNo: '3',
        listingDate: '10/07/2025',
        court: 'Court II',
        listingCases: '1',
      },
      {
        sNo: '4',
        listingDate: '03/07/2025',
        court: 'Court III',
        listingCases: '5',
      },
      {
        sNo: '5',
        listingDate: '01/07/2025',
        court: 'Registrar Court',
        listingCases: '5',
      },
      {
        sNo: '6',
        listingDate: '01/07/2025',
        court: 'Court II',
        listingCases: '10',
      },
      {
        sNo: '7',
        listingDate: '01/07/2025',
        court: 'Court I',
        listingCases: '10',
      },
      {
        sNo: '8',
        listingDate: '01/07/2025',
        court: 'Court I',
        listingCases: '10',
      },
      {
        sNo: '9',
        listingDate: '01/07/2025',
        court: 'Registrar Court',
        listingCases: '10',
      },
      {
        sNo: '10',
        listingDate: '01/07/2025',
        court: 'Court I',
        listingCases: '10',
      },
      {
        sNo: '1',
        listingDate: '01/07/2025',
        court: 'Court I',
        listingCases: '10',
      },
      {
        sNo: '1',
        listingDate: '01/07/2025',
        court: 'Court I',
        listingCases: '10',
      },
      {
        sNo: '1',
        listingDate: '01/07/2025',
        court: 'Court I',
        listingCases: '10',
      },
      {
        sNo: '1',
        listingDate: '01/07/2025',
        court: 'Court I',
        listingCases: '10',
      },
    ];
  }
}
