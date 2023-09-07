import {DatePipe} from "@angular/common";
import {ToastController} from "@ionic/angular";
import { environment } from "src/environments/environment";

export class Global {

  public static urlServer = environment.urlServer;
  /*
  *  variables de los roles
  * */
  public static userKey = 'userData';


  public static rolMedico = 1;
  public static rolFarmaceutico = 2;
  public static rolCliente = 3;
  // public static rolAdministrador = 4;

  /*
  *  permisos de interfaces de acuerdo a los roles
  * */

  public static vistasCliente = ['mostrar-receta', 'detalle-receta'];
  public static vistasMedico = ['generar-receta', 'mostrar-receta', 'detalle-receta'];
  public static vistasFarmaceutico = ['mostrar-receta', 'inventario','entregar-receta','agregar-medicamento','detalle-medicamento','editar-medicamento','detalle-receta'];
  public static vistasAdministrador = ['administracion-cuentas'];

  /* eventos generales */
  public static contarClaves(data: any): number {
    if(data === undefined)
      return 0;
    return Object.keys(data).length;
  }


  public static isNullOrUndefined(data: any): boolean {
    return data === null || data === undefined;
  }

  public static castDate(datePipe: DatePipe, fecha: string | Date): string {
    if(this.isNullOrUndefined(fecha)) {
      return '';
    } else {
      let tmpDate;
      if (typeof fecha === 'string') {
        tmpDate = new Date(fecha)
      } else {
        tmpDate = fecha;
      }
      return datePipe.transform(tmpDate, 'dd-MM-yyy hh:mm')!;
    }
  }

  public static castDateF2(datePipe: DatePipe, fecha: string | Date): string {
    if(this.isNullOrUndefined(fecha)) {
      return '';
    } else {
      let tmpDate;
      if (typeof fecha === 'string') {
        tmpDate = new Date(fecha)
      } else {
        tmpDate = fecha;
      }
      return datePipe.transform(tmpDate, 'yyy-MM-dd hh:mm:ss')!;
    }
  }

  public static async mostrarAlert(toastController: ToastController, status: GlobalStatus, mensaje: string) {
    const toast = await toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'bottom',
      color: status, // Cambia el color (primary, secondary, success, warning, danger)
      buttons: [
        {
          text: 'Cerrar',
          role: 'cancel',
          handler: () => {
            // console.log('Toast cerrado');
          }
        }
      ],
      cssClass: 'my-toast' // Clase CSS personalizada para aplicar estilos adicionales
    });
    toast.present();
  }

}

export enum GlobalStatus {
  primary = "primary",
  secondary = "secondary",
  success = "success",
  warning = "warning",
  danger = "danger"
}
