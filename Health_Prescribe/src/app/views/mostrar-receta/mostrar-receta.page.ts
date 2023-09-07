import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthObject, DetalleReceta, Farmaceutico, Receta, RecetaCreate, RecetaDetalle} from "../../modelos/Modelo";
import {LoginService} from "../../services/login/login.service";
import {RecetaService} from "../../services/receta/receta.service";
import {DatePipe} from "@angular/common";
import {Global, GlobalStatus} from "../../util/Global";
import {ToastController} from "@ionic/angular";

@Component({
  selector: 'app-mostrar-receta',
  templateUrl: './mostrar-receta.page.html',
  styleUrls: ['./mostrar-receta.page.scss'],
  providers: [DatePipe]
})
export class MostrarRecetaPage {
  public recetaObjeto: Receta = {} as Receta;
  public detallesReceta: DetalleReceta[] = [];
  public mostrarFormularioBuscar: boolean = false;
  public esVistaFarmaceutico: boolean = false;
  public txtCodigoBuscar: string = '';
  public txtCodigoBarraBuscar: string = '';
  public dataUser: AuthObject = {};
  public farmaceutico: Farmaceutico = {} as Farmaceutico;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private accountService: LoginService,
              // private clienteService: ClienteService,
              // private medicoService: MedicoServiceService,
              // private guards: GlobalGuardsGuard,
              private recetaService: RecetaService,
              public toastController: ToastController,
              public datepipe: DatePipe) {
  }

  ngOnInit(): void {

    const data = this.route.snapshot.data;
    console.log(data); // Accede a los datos aquí

    const saltarValidacion = false;
    if (this.accountService.sessionExists() || saltarValidacion) {
      this.dataUser = this.accountService.getDataUser();
      if (Global.contarClaves(this.dataUser) > 0) {
        if (this.accountService.isFarmaceutico() || saltarValidacion) {
          // carga los combos solo si es medico....
          if (!saltarValidacion) {
            this.farmaceutico = this.dataUser.farmaceutico!;
          }
        }
      }
    }
    // automaticamente buscar la receta en cuestión
    if (data['code'] === 'receta-view-paciente' || data['code'] === 'receta-view-medico') {
      const idReceta: number = Number(this.route.snapshot.paramMap.get('idReceta'));
      this.recetaService.getRecetas(idReceta).subscribe({
        next: (data: DetalleReceta[]) => {
          console.log('getRecetas ', data);
          this.detallesReceta = data;
          if (data.length > 0) {
            this.recetaObjeto = data[0].receta;
            console.log('las tortas ', this.recetaObjeto);
          }
          // this.recetaObjeto = data;
        },
        error: (error) => {
          console.log('ERROR getRecetas: ', error);
          console.log(error.error.text);
        }
      });
    }
    // muestra form para que el farmaceutico busque la receta
    if (data['code'] === 'receta-view-farmaceutico') {
      this.mostrarFormularioBuscar = true;
      this.esVistaFarmaceutico = true;
    }

  }

  ngAfterViewInit() {
    // setTimeout(() => {
    //     const inputElement: HTMLInputElement = this.elRef.nativeElement.querySelector('#InputCodigoBarraBuscar');
    //     if (inputElement) {
    //         inputElement.focus();
    //     }
    // }, 0);
  }

  contarClaves(element: any) {
    return Global.contarClaves(element);
  }

  isNullOrUndefined(element: any) {
    return Global.isNullOrUndefined(element);
  }

  recetaEntregada() {
    const recetaObj: RecetaCreate = {} as RecetaCreate;
    recetaObj.id_receta = this.recetaObjeto.id_receta;
    recetaObj.codigo_receta = this.recetaObjeto.codigo_receta;
    recetaObj.medico = this.recetaObjeto.medico.id_medico;
    recetaObj.paciente = this.recetaObjeto.paciente.id_cliente;
    recetaObj.estado = "entregado";
    recetaObj.farmaceutico = this.farmaceutico.id_farmaceutico;
    recetaObj.fecha_entrega = this.castDate2(new Date());

    this.recetaService.updateReceta(this.recetaObjeto.id_receta, recetaObj).subscribe({
      next: (data: RecetaCreate) => {
        console.log('updateReceta ', data);
        Global.mostrarAlert(this.toastController, GlobalStatus.success, 'Información: Receta entregada');
        this.recetaObjeto.estado = data.estado;
      },
      error: (error) => {
        console.log('ERROR updateReceta: ', error);
        console.log(error.error.text);
        Global.mostrarAlert(this.toastController, GlobalStatus.warning, 'Error: No se ha marcado como entregada la receta.');
      }
    });
  }

  getEstadoSeverity(element: string) {
    if (element === 'pendiente') {
      return 'primary';
    }
    if (element === 'entregado') {
      return 'success';
    }
    return 'secondary';
  }

  cancelarBusqueda() {
    this.recetaObjeto = {} as Receta;
  }

  searchReceta() {
    // txtCodigoBuscar
    this.recetaService.buscarPorCodigoReceta(this.txtCodigoBuscar).subscribe({
      next: (data: Receta[]) => {
        console.log('buscarPorCodigoReceta ', data);
        if (data.length > 0) {
          this.recetaObjeto = data[0];
          Global.mostrarAlert(this.toastController, GlobalStatus.success, 'Información: Receta encontrada.');
          //this.setFocus();
        } else {
          Global.mostrarAlert(this.toastController, GlobalStatus.danger, 'Error: Receta no encontrada.');
        }
      },
      error: (error) => {
        console.log('ERROR buscarPorCodigoReceta: ', error);
        console.log(error.error.text);
      }
    });
  }

  validarRecetaPendiente() {
    return this.esVistaFarmaceutico && this.contarClaves(this.recetaObjeto) > 0
      && this.recetaObjeto.estado === 'pendiente';
  }

  castDate(fecha: string | Date) {
    return Global.castDate(this.datepipe, fecha);
  }

  castDate2(fecha: string | Date) {
    return Global.castDateF2(this.datepipe, fecha);
  }

  marcarItemFarmaco(codigoBarra: string) {
    let farmacoFind = false;
    if (!this.isNullOrUndefined(codigoBarra) && codigoBarra.length > 0) {
      for (const itemRecetaDetalle of this.recetaObjeto.receta_listado) {
        if (itemRecetaDetalle.farmaco.bar_code! === codigoBarra) {
          itemRecetaDetalle.entregado = true;
          farmacoFind = true;
          Global.mostrarAlert(this.toastController, GlobalStatus.success, 'Información: Producto marcado correctamente.');
          return;
        }
      }
      if (!farmacoFind) {
        Global.mostrarAlert(this.toastController, GlobalStatus.warning, 'Atención: El códdigo capturado no se encuentra asociado a algún fármaco.');
      }
    }
  }

  searchFarmaco() {
    this.marcarItemFarmaco(this.txtCodigoBarraBuscar);
  }

  getEstadoColor(val: boolean) {
    return val ? GlobalStatus.success : GlobalStatus.warning;
  }

  getEstadoTexto(val: boolean) {
    return val ? 'Habilitado' : 'Inactivo';
  }
}
