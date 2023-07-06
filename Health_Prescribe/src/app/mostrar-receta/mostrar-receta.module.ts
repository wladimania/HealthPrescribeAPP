import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MostrarRecetaPageRoutingModule } from './mostrar-receta-routing.module';

import { MostrarRecetaPage } from './mostrar-receta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MostrarRecetaPageRoutingModule
  ],
  declarations: [MostrarRecetaPage]
})
export class MostrarRecetaPageModule {}
