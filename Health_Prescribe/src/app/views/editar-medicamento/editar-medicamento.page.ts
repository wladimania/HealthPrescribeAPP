import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Medicamento } from 'src/app/modelos/Modelo';
import {MedicamentoService} from "../../services/medicamento/medicamento.service";

@Component({
  selector: 'app-editar-medicamento',
  templateUrl: './editar-medicamento.page.html',
  styleUrls: ['./editar-medicamento.page.scss'],
})
export class EditarMedicamentoPage implements OnInit {
  medicamento!: Medicamento;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private navCtrl: NavController,
              private medicamentoService: MedicamentoService
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras && navigation.extras.state) {
      this.medicamento = navigation.extras.state['medicamento'];
    }
  }

  ngOnInit() {}

  guardarCambios() {
    // Lógica para guardar los cambios del medicamento
    console.log('Guardar cambios:', this.medicamento);
    this.medicamentoService.updateMedicamentos(this.medicamento.id_medicamento, this.medicamento).subscribe({
      next: (data: any) => {
        console.log('guardarCambios ', data);
      },
      error: (error) => {
        console.log('ERROR guardarCambios: ', error);
        console.log(error.error.text);
      }
    });

    // Navegar de vuelta a la vista de inventario
    this.navCtrl.navigateBack('/inventario');
  }
}
