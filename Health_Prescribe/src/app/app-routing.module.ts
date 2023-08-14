import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },{
    path: 'home',
    loadChildren: () => import('./views/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./views/login/login.module').then( m => m.LoginPageModule)
  },
  // {
  //   path: 'generar-receta',
  //   loadChildren: () => import('./views/generar-receta/generar-receta.module').then( m => m.GenerarRecetaPageModule)
  // },
  // {
  //   path: 'mostrar-receta',
  //   loadChildren: () => import('./views/mostrar-receta/mostrar-receta.module').then( m => m.MostrarRecetaPageModule)
  // },
  // {
  //   path: 'inventario',
  //   loadChildren: () => import('./views/inventario/inventario.module').then( m => m.InventarioPageModule)
  // },
  // {
  //   path: 'entregar-receta',
  //   loadChildren: () => import('./views/entregar-receta/entregar-receta.module').then( m => m.EntregarRecetaPageModule)
  // },
  // {
  //   path: 'agregar-medicamento',
  //   loadChildren: () => import('./views/agregar-medicamento/agregar-medicamento.module').then( m => m.AgregarMedicamentoPageModule)
  // },
  // {
  //   path: 'detalle-medicamento',
  //   loadChildren: () => import('./views/detalle-medicamento/detalle-medicamento.module').then( m => m.DetalleMedicamentoPageModule)
  // },
  // {
  //   path: 'editar-medicamento',
  //   loadChildren: () => import('./views/editar-medicamento/editar-medicamento.module').then( m => m.EditarMedicamentoPageModule)
  // },
  // {
  //   path: 'detalle-receta',
  //   loadChildren: () => import('./views/detalle-receta/detalle-receta.module').then( m => m.DetalleRecetaPageModule)
  // },
  // {
  //   path: 'administracion-cuentas',
  //   loadChildren: () => import('./views/administracion-cuentas/administracion-cuentas.module').then( m => m.AdministracionCuentasPageModule)
  // }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
