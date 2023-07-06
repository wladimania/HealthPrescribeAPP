import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {}
  public pages = [
    { title: 'Generar Receta', url: '/generar-receta' },
    { title: 'Mostrar Receta', url: '/mostrar-receta' },
    { title: 'Inventario', url: '/inventario' },
    { title: 'Entregar Receta', url: '/entregar-receta' }
  ];
}
