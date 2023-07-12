import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MostrarRecetaPage } from './mostrar-receta.page';

const routes: Routes = [
  {
    path: '',
    component: MostrarRecetaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MostrarRecetaPageRoutingModule {}
