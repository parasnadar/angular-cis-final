import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private messageService: MessageService) {}

  showSuccess(detail: string, summary: string = 'Success') {
    this.messageService.add({ severity: 'success', summary, detail });
  }

  showError(detail: string, summary: string = 'Error') {
    this.messageService.add({ severity: 'error', summary, detail });
  }

  showInfo(detail: string, summary: string = 'Info') {
    this.messageService.add({ severity: 'info', summary, detail });
  }

  showWarning(detail: string, summary: string = 'Warning') {
    this.messageService.add({ severity: 'warn', summary, detail });
  }
}
