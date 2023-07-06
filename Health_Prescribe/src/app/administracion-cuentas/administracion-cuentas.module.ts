import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { AdministracionCuentasPageRoutingModule } from './administracion-cuentas-routing.module';
import { AdministracionCuentasPage } from './administracion-cuentas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, // Agrega esta línea para importar el FormsModule
    IonicModule,
    AdministracionCuentasPageRoutingModule
  ],
  declarations: [AdministracionCuentasPage]
})
export class AdministracionCuentasPageModule {}
