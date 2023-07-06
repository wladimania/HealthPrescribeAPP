import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'generar-receta',
    loadChildren: () => import('./generar-receta/generar-receta.module').then( m => m.GenerarRecetaPageModule)
  },
  {
    path: 'mostrar-receta',
    loadChildren: () => import('./mostrar-receta/mostrar-receta.module').then( m => m.MostrarRecetaPageModule)
  },
  {
    path: 'inventario',
    loadChildren: () => import('./inventario/inventario.module').then( m => m.InventarioPageModule)
  },
  {
    path: 'entregar-receta',
    loadChildren: () => import('./entregar-receta/entregar-receta.module').then( m => m.EntregarRecetaPageModule)
  },
  {
    path: 'agregar-medicamento',
    loadChildren: () => import('./agregar-medicamento/agregar-medicamento.module').then( m => m.AgregarMedicamentoPageModule)
  },
  {
    path: 'detalle-medicamento',
    loadChildren: () => import('./detalle-medicamento/detalle-medicamento.module').then( m => m.DetalleMedicamentoPageModule)
  },
  {
    path: 'editar-medicamento',
    loadChildren: () => import('./editar-medicamento/editar-medicamento.module').then( m => m.EditarMedicamentoPageModule)
  },
  {
    path: 'detalle-receta',
    loadChildren: () => import('./detalle-receta/detalle-receta.module').then( m => m.DetalleRecetaPageModule)
  },
  {
    path: 'administracion-cuentas',
    loadChildren: () => import('./administracion-cuentas/administracion-cuentas.module').then( m => m.AdministracionCuentasPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
