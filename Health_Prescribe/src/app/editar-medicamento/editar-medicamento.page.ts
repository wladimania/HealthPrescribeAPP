import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Medicamento } from 'src/app/modelos/Modelo';

@Component({
  selector: 'app-editar-medicamento',
  templateUrl: './editar-medicamento.page.html',
  styleUrls: ['./editar-medicamento.page.scss'],
})
export class EditarMedicamentoPage implements OnInit {
  medicamento!: Medicamento;

  constructor(private route: ActivatedRoute, private router: Router, private navCtrl: NavController) {
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
    this.navCtrl.navigateBack('/inventario');
  }
}
