import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mostrar-receta',
  templateUrl: './mostrar-receta.page.html',
  styleUrls: ['./mostrar-receta.page.scss'],
})
export class MostrarRecetaPage {
  recetas: any[] = [];

  constructor(private router: Router) {
    this.recetas = [
      {
        id: 1,
        paciente: 'Nombre del Paciente 1',
        fecha: '01/07/2023',
        medico: 'Dr. Juan Pérez',
        medicamentos: [
          { nombre: 'Medicamento 1', cantidad: 1, indicaciones: 'Tomar cada 8 horas' },
          { nombre: 'Medicamento 2', cantidad: 2, indicaciones: 'Tomar antes de dormir' }
        ]
      },
      {
        id: 2,
        paciente: 'Nombre del Paciente 2',
        fecha: '02/07/2023',
        medico: 'Dr. Ana Gómez',
        medicamentos: [
          { nombre: 'Medicamento 3', cantidad: 1, indicaciones: 'Tomar después de cada comida' },
          { nombre: 'Medicamento 4', cantidad: 3, indicaciones: 'Tomar antes de dormir' }
        ]
      },
      {
        id: 3,
        paciente: 'Nombre del Paciente 3',
        fecha: '03/07/2023',
        medico: 'Dr. Luis Torres',
        medicamentos: [
          { nombre: 'Medicamento 5', cantidad: 2, indicaciones: 'Tomar cada 12 horas' },
          { nombre: 'Medicamento 6', cantidad: 1, indicaciones: 'Tomar antes de dormir' }
        ]
      }
    ];
  }

  verDetalleReceta(receta: any) {
    // Navegar a la vista de detalle-receta pasando la receta como parámetro
    this.router.navigate(['/detalle-receta'], { state: { receta } });
  }
}
