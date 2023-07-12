import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarMedicamentoPageRoutingModule } from './editar-medicamento-routing.module';

import { EditarMedicamentoPage } from './editar-medicamento.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarMedicamentoPageRoutingModule
  ],
  declarations: [EditarMedicamentoPage]
})
export class EditarMedicamentoPageModule {}
