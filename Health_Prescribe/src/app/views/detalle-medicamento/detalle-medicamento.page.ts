import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Medicamento} from "../../modelos/Modelo";

@Component({
  selector: 'app-detalle-medicamento',
  templateUrl: './detalle-medicamento.page.html',
  styleUrls: ['./detalle-medicamento.page.scss'],
})
export class DetalleMedicamentoPage implements OnInit {
  medicamento!: Medicamento;

  constructor(private route: ActivatedRoute, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras && navigation.extras.state) {
      this.medicamento = navigation.extras.state['medicamento'];
    }
  }

  ngOnInit() {}

  guardarCambios() {
    // Lógica para guardar los cambios del medicamento
    console.log('Guardar cambios:', this.medicamento);
    // Navegar de vuelta a la vista de inventario
    this.router.navigate(['/inventario']);
  }
}
