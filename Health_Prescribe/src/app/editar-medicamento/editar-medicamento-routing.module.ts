import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarMedicamentoPage } from './editar-medicamento.page';

const routes: Routes = [
  {
    path: '',
    component: EditarMedicamentoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarMedicamentoPageRoutingModule {}
