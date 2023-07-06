import { Component } from '@angular/core';

@Component({
  selector: 'app-detalle-receta',
  templateUrl: './detalle-receta.page.html',
  styleUrls: ['./detalle-receta.page.scss'],
})
export class DetalleRecetaPage   {
  paciente: any; // Define la propiedad paciente con el tipo adecuado
  receta: any; // Define la propiedad receta con el tipo adecuado

  constructor() {
    // Asigna valores a las propiedades paciente y receta
    this.paciente = {
      nombre: 'Nombre del Paciente',
      edad: 30,
      genero: 'Masculino',
      telefono: '1234567890'
    };

    this.receta = {
      fecha: '01/07/2023',
      medicamentos: [
        { nombre: 'Medicamento 1', cantidad: 1, indicaciones: 'Tomar cada 8 horas' },
        { nombre: 'Medicamento 2', cantidad: 2, indicaciones: 'Tomar antes de dormir' }
      ]
    };
  }
}