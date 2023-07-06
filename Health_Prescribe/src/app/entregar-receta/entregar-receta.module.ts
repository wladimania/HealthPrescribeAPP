import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EntregarRecetaPageRoutingModule } from './entregar-receta-routing.module';

import { EntregarRecetaPage } from './entregar-receta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EntregarRecetaPageRoutingModule
  ],
  declarations: [EntregarRecetaPage]
})
export class EntregarRecetaPageModule {}
