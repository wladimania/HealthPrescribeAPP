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
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
