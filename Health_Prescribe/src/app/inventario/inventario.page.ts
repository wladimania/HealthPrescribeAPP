import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Medicamento } from 'src/app/modelos/Modelo';

@Component({
  selector: 'app-inventario',
  templateUrl: 'inventario.page.html',
  styleUrls: ['inventario.page.scss'],
})
export class InventarioPage {
  listaMedicamentos: Medicamento[] = [
    { nombre: 'Medicamento 1', cantidad: 10, concentracion: '5mg', laboratorio: 'Laboratorio A', proveedor: 'Proveedor A' },
    { nombre: 'Medicamento 2', cantidad: 5, concentracion: '10mg', laboratorio: 'Laboratorio B', proveedor: 'Proveedor B' },
    { nombre: 'Medicamento 3', cantidad: 8, concentracion: '20mg', laboratorio: 'Laboratorio C', proveedor: 'Proveedor C' },
  ];

  constructor(private navCtrl: NavController) {}

  editMedicamento(medicamento: Medicamento) {
    // Navegar a la vista de editar-medicamento con la información del medicamento seleccionado
    this.navCtrl.navigateForward('/editar-medicamento', { state: { medicamento } });
  }

  deleteMedicamento(medicamento: Medicamento) {
    // Lógica para eliminar el medicamento
    const index = this.listaMedicamentos.indexOf(medicamento);
    if (index !== -1) {
      this.listaMedicamentos.splice(index, 1);
      console.log('Medicamento eliminado:', medicamento);
    }
  }

  goToAddMedicamento() {
    this.navCtrl.navigateForward('/agregar-medicamento');
  }

  verDetalleMedicamento(medicamento: Medicamento) {
    // Navegar al detalle del medicamento pasando el objeto medicamento como parámetro
    this.navCtrl.navigateForward('/detalle-medicamento', { state: { medicamento } });
  }
}
