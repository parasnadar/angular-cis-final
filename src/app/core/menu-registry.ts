import { Type } from '@angular/core';
import { DefectNoticesComponent } from '../Shared/menus/report/defect-notices/defect-notices.component';
import { ScrutinizedCasesComponent } from '../Shared/menus/report/scrutinized-cases/scrutinized-cases.component';
import { FinalCauselistComponent } from '../Shared/menus/causelist/final-causelist/final-causelist.component';
import { GenerateOrderComponent } from '../Shared/menus/order/generate-order/generate-order.component';
import { UploadOrderComponent } from '../Shared/menus/order/upload-order/upload-order.component';
import { ScrutinyComponent } from '../Shared/menus/document-scrutiny/scrutiny/scrutiny.component';
import { DraftCauselistComponent } from '../Shared/menus/causelist/draft-causelist/draft-causelist.component';
import { CaseDocsComponent } from '../Shared/menus/report/case-docs/case-docs.component';
import { InterBenchComponent } from '../Shared/menus/listing/inter-bench/inter-bench.component';
import { MisReportComponent } from '../Shared/menus/report/mis-report/mis-report.component';
import { EfiledCasesComponent } from '../Shared/menus/report/efiled-cases/efiled-cases.component';
import { CaseStatusComponent } from '../Shared/menus/report/case-status/case-status.component';
import { TransferActionTakenComponent } from '../Shared/menus/transfer-case/transfer-action-taken/transfer-action-taken.component';
import { TransferRequestComponent } from '../Shared/menus/transfer-case/transfer-request/transfer-request.component';
import { RecuseJudgesFromCaseComponent } from '../Shared/menus/recuse/recuse-judges-from-case/recuse-judges-from-case.component';
import { RecusedCasesComponent } from '../Shared/menus/recuse/recused-cases/recused-cases.component';
export const MENU_REGISTRY: Record<string, Type<any>> = {
  final_causelist: FinalCauselistComponent,
  defect_notices: DefectNoticesComponent,
  scrutinized_notices: ScrutinizedCasesComponent,
  generate_order: GenerateOrderComponent,
  upload_order: UploadOrderComponent,
  scrutiny: ScrutinyComponent,
  draft_causelist: DraftCauselistComponent,
  case_docs: CaseDocsComponent,
  inter_bench: InterBenchComponent,
  mis_report: MisReportComponent,
  efiled_cases: EfiledCasesComponent,
  case_status: CaseStatusComponent,
  transfer_action_taken: TransferActionTakenComponent,
  transfer_request: TransferRequestComponent,
  recuse_judge_from_case: RecuseJudgesFromCaseComponent,
  recused_cases: RecusedCasesComponent,
  // Add more mappings here as you create more screens
};
