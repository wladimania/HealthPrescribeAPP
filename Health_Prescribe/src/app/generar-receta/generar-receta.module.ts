import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GenerarRecetaPageRoutingModule } from './generar-receta-routing.module';

import { GenerarRecetaPage } from './generar-receta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GenerarRecetaPageRoutingModule
  ],
  declarations: [GenerarRecetaPage]
})
export class GenerarRecetaPageModule {}
