import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {HomePage} from './home.page';

import {HomePageRoutingModule} from './home-routing.module';
import {GenerarRecetaPage} from "../generar-receta/generar-receta.page";
import {MostrarRecetaPage} from "../mostrar-receta/mostrar-receta.page";
import {InventarioPage} from "../inventario/inventario.page";
import {EntregarRecetaPage} from "../entregar-receta/entregar-receta.page";
import {AgregarMedicamentoPage} from "../agregar-medicamento/agregar-medicamento.page";
import {DetalleMedicamentoPage} from "../detalle-medicamento/detalle-medicamento.page";
import {EditarMedicamentoPage} from "../editar-medicamento/editar-medicamento.page";
import {DetalleRecetaPage} from "../detalle-receta/detalle-receta.page";
import {AdministracionCuentasPage} from "../administracion-cuentas/administracion-cuentas.page";
import {RecetaListadoComponent} from "../receta-listado/receta-listado.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, GenerarRecetaPage, MostrarRecetaPage, InventarioPage, EntregarRecetaPage,
    AgregarMedicamentoPage, DetalleMedicamentoPage, DetalleMedicamentoPage, EditarMedicamentoPage,
    DetalleRecetaPage, AdministracionCuentasPage, RecetaListadoComponent]
})
export class HomePageModule {
}
