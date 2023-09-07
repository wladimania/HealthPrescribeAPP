import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomePage} from './home.page';
import {GenerarRecetaPage} from "../generar-receta/generar-receta.page";
import {MostrarRecetaPage} from "../mostrar-receta/mostrar-receta.page";
import {DetalleRecetaPage} from "../detalle-receta/detalle-receta.page";
import {EditarMedicamentoPage} from "../editar-medicamento/editar-medicamento.page";
import {InventarioPage} from "../inventario/inventario.page";
import {EntregarRecetaPage} from "../entregar-receta/entregar-receta.page";
import {AgregarMedicamentoPage} from "../agregar-medicamento/agregar-medicamento.page";
import {DetalleMedicamentoPage} from "../detalle-medicamento/detalle-medicamento.page";
import {AdministracionCuentasPage} from "../administracion-cuentas/administracion-cuentas.page";
import { RecetaListadoComponent } from '../receta-listado/receta-listado.component';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'listar-receta',
        component: RecetaListadoComponent
      },
      {
        path: 'generar-receta',
        component: GenerarRecetaPage
      },
      {
        path: 'paciente/receta-vista/:idReceta',
        component: MostrarRecetaPage,
        data: {
          title: 'Receta Médica',
          code: 'receta-view-paciente'
        }
      },
      // {
      //   path: 'mostrar-receta',
      //   component: MostrarRecetaPage
      // },
      {
        path: 'inventario',
        component: InventarioPage
      },
      {
        path: 'entregar-receta',
        component: EntregarRecetaPage
      },
      {
        path: 'agregar-medicamento',
        component: AgregarMedicamentoPage
      },
      {
        path: 'detalle-medicamento',
        component: DetalleMedicamentoPage
      },
      {
        path: 'editar-medicamento',
        component: EditarMedicamentoPage
      },
      {
        path: 'detalle-receta',
        component: DetalleRecetaPage
      },
      {
        path: 'administracion-cuentas',
        component: AdministracionCuentasPage
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {
}
