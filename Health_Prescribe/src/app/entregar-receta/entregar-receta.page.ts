import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-entregar-receta',
  templateUrl: './entregar-receta.page.html',
  styleUrls: ['./entregar-receta.page.scss'],
})
export class EntregarRecetaPage implements OnInit {
  paciente: any = {
    nombre: 'Pepe Pecas',
    edad: 30,
    genero: 'Masculino',
  };

  medico: any = {
    nombre:'Juan Gregorio',
  };

  listaMedicamentos: any[] = [
    { nombre: 'Medicamento 1', cantidad: 10, concentracion: '5mg' },
    { nombre: 'Medicamento 2', cantidad: 5, concentracion: '10mg' },
    { nombre: 'Medicamento 3', cantidad: 8, concentracion: '20mg' },
  ];

  constructor() {}

  ngOnInit() {}
}
