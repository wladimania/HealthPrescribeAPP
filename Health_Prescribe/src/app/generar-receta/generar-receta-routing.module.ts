import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GenerarRecetaPage } from './generar-receta.page';

const routes: Routes = [
  {
    path: '',
    component: GenerarRecetaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GenerarRecetaPageRoutingModule {}
