import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EntregarRecetaPage } from './entregar-receta.page';

const routes: Routes = [
  {
    path: '',
    component: EntregarRecetaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntregarRecetaPageRoutingModule {}
