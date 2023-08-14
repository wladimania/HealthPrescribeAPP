import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {MedicamentoService} from "../../services/medicamento/medicamento.service";

@Component({
  selector: 'app-agregar-medicamento',
  templateUrl: './agregar-medicamento.page.html',
  styleUrls: ['./agregar-medicamento.page.scss'],
})
export class AgregarMedicamentoPage {
  medicamentoData = {
    nombre: '',
    cantidad: 0,
    concentracion: '',
    laboratorio: '',
    proveedor: ''
  };
  constructor(private router: Router, private medicamentoService: MedicamentoService) {}

  agregarMedicamento() {
    this.medicamentoService.insertMedicamentos(this.medicamentoData).subscribe(
      (response: any) => {
        // Manejo de respuesta exitosa
        console.log('Medicamento agregado:', response);
        this.router.navigate(['/inventario']);
      },
      (error: any) => {
        // Manejo de error
        console.error('Error al agregar medicamento:', error);
      }
    );
  }


}
