import { Type } from '@angular/core';
import { DefectNoticesComponent } from '../Shared/menus/report/defect-notices/defect-notices.component';
import { ScrutinizedCasesComponent } from '../Shared/menus/report/scrutinized-cases/scrutinized-cases.component';
import { FinalCauselistComponent } from '../Shared/menus/causelist/final-causelist/final-causelist.component';
import { GenerateOrderComponent } from '../Shared/menus/order/generate-order/generate-order.component';
import { UploadOrderComponent } from '../Shared/menus/order/upload-order/upload-order.component';
import { ScrutinyComponent } from '../Shared/menus/document-scrutiny/scrutiny/scrutiny.component';
// 2. Map the menu string IDs to their compiled component classes
export const MENU_REGISTRY: Record<string, Type<any>> = {
  final_causelist: FinalCauselistComponent,
  defect_notices: DefectNoticesComponent,
  scrutinized_notices: ScrutinizedCasesComponent,
  generate_order: GenerateOrderComponent,
  upload_order: UploadOrderComponent,
  scrutiny: ScrutinyComponent,

  // Add more mappings here as you create more screens
};
