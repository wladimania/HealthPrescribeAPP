import { Component, OnInit } from '@angular/core';
import {Global} from "../../util/Global";
import {Farmaco, Medicamento} from "../../modelos/Modelo";
import {ModalController, NavParams} from "@ionic/angular";
import {FarmacoService} from "../../services/farmaco/farmaco.service";
@Component({
  selector: 'app-farmacos-dialog',
  templateUrl: './farmacos-dialog.component.html',
  styleUrls: ['./farmacos-dialog.component.scss'],
})
export class FarmacosDialogComponent  implements OnInit {

  public listaFarmacos: Medicamento[] = [];

  public mostrarSelectButton: boolean = false;
  constructor(private modalController: ModalController,
              private navParams: NavParams,
              private farmacoService: FarmacoService) { }


  ngOnInit() {

    const modoModal = this.navParams.get('modoModal');
    if (modoModal) {
      this.mostrarSelectButton = true;
    }
    this.farmacoService.getListaFarmacos().subscribe({
      next: (data: Medicamento[]) => {
        console.log('getListaFarmacos ', data);
        this.listaFarmacos = data;
      },
      error: (error) => {
        console.log('ERROR getListaClientes: ', error);
        console.log(error.error.text);
      }
    });
  }

  selectFarmaco(farmaco: Medicamento) {
    this.modalController.dismiss(farmaco);
  }

  getStockSeverity(quantity: number) {
    if (Global.isNullOrUndefined(quantity) || quantity <= 0) {
      return 'danger';
    }
    if (quantity <= 10) {
      return 'warning';
    }
    return 'success';
  }

  isNullOrUndefined(obj: any) {
    return Global.isNullOrUndefined(obj);
  }

  volverAtras() {
    history.back();
  }
}
