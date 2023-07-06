import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalleMedicamentoPage } from './detalle-medicamento.page';

const routes: Routes = [
  {
    path: '',
    component: DetalleMedicamentoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalleMedicamentoPageRoutingModule {}
