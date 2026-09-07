import { Component, inject } from '@angular/core';
import {
  CustomTableComponent,
  ColumnDef,
  TableAction,
} from '../../../custom-table/custom-table.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-view-bench',
  imports: [CustomTableComponent],
  templateUrl: './view-bench.component.html',
  styleUrl: './view-bench.component.scss',
})
export class ViewBenchComponent {
  private router = inject(Router);
  caseRecords: any[] = [];
  ngOnInit(): void {
    this.loadApiData();
  }
  tableColumns: ColumnDef[] = [
    { field: 'sNo', header: 'Sr. No.' },
    { field: 'oldFiling', header: 'Bench No' },
    { field: 'newFiling', header: 'Court No' },
    { field: 'causeTitle', header: 'Type' },
    { field: 'from', header: 'From ' },
    { field: 'to', header: 'Member' },
    { field: 'request', header: 'Presiding' },
  ];

  loadApiData(): void {
    this.caseRecords = [
      {
        sNo: '1',
        oldFiling: '1',
        newFiling: '1',
        causeTitle: 'Daily',
        from: '25/08/2026',
        to: 'Justice (Retd.) Dr. Sanjaya Kumar Mishra',
        request: 'Justice (Retd.) Dr. Sanjaya Kumar Mishra',
      },
      {
        sNo: '1',
        oldFiling: '1',
        newFiling: '1',
        causeTitle: 'Daily',
        from: '25/08/2026',
        to: 'Justice (Retd.) Dr. Sanjaya Kumar Mishra',
        request: 'Justice (Retd.) Dr. Sanjaya Kumar Mishra',
      },
      {
        sNo: '1',
        oldFiling: '1',
        newFiling: '1',
        causeTitle: 'Daily',
        from: '25/08/2026',
        to: 'Justice (Retd.) Dr. Sanjaya Kumar Mishra',
        request: 'Justice (Retd.) Dr. Sanjaya Kumar Mishra',
      },
    ];
  }
  handleRecordView(selectedRow: any): void {
    console.log('Selected case for viewing:', selectedRow);
    alert(`Opening details for case: ${selectedRow.diaryNo}`);
  }

  customActions: TableAction[] = [
    {
      label: 'Modify',
      icon: 'pi pi-external-link',
      action: (row) => {
        // 1. Angular route se dynamic URL path generate karein
        const urlTree = this.router.createUrlTree([
          '/cases',
          row.location,
          'details',
        ]);
        const url = this.router.serializeUrl(urlTree);

        // 2. Naye tab me open karein
        window.open(url, '_blank');
      },
    },
  ];
}
