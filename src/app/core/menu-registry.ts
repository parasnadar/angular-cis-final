import { Type } from '@angular/core';
import { CauselistComponent } from '../Shared/menus/causelist/causelist.component';
import { ReportComponent } from '../Shared/menus/report/report.component';

// 2. Map the menu string IDs to their compiled component classes
export const MENU_REGISTRY: Record<string, Type<any>> = {
  stfinal_causelist: CauselistComponent,
  sdefect_notices: ReportComponent,

  // Add more mappings here as you create more screens
};
