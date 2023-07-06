import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleMedicamentoPageRoutingModule } from './detalle-medicamento-routing.module';

import { DetalleMedicamentoPage } from './detalle-medicamento.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleMedicamentoPageRoutingModule
  ],
  declarations: [DetalleMedicamentoPage]
})
export class DetalleMedicamentoPageModule {}
