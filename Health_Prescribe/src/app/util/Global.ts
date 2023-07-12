import {DatePipe} from "@angular/common";

export class Global {

  public static urlServer = 'http://127.0.0.1:8000/';
  /*
  *  variables de los roles
  * */
  public static userKey = 'userData';

  public static rolFarmaceutico = 1;
  public static rolMedico = 2;
  public static rolCliente = 3;
  // public static rolAdministrador = 4;

  /*
  *  permisos de interfaces de acuerdo a los roles
  * */

  public static vistasCliente = ['receta-view-paciente', 'receta-list-paciente'];
  public static vistasMedico = ['receta-create', 'receta-list-medico', 'receta-view-medico'];
  public static vistasFarmaceutico = ['receta-view-farmaceutico', 'farmaco-crud-farmaceutico'];
  public static vistasAdministrador = [];

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
}
