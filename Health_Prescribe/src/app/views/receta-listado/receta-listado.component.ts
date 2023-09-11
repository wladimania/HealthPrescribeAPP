import {DatePipe} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertController, ModalController, ToastController} from '@ionic/angular';
import {AuthObject, Login, Receta} from 'src/app/modelos/Modelo';
import {ClienteService} from 'src/app/services/cliente/cliente.service';
import {LoginService} from 'src/app/services/login/login.service';
import {MedicoService} from 'src/app/services/medico/medico.service';
import {RecetaService} from 'src/app/services/receta/receta.service';
import {Global, GlobalStatus} from 'src/app/util/Global';


@Component({
  selector: 'app-receta-listado',
  templateUrl: './receta-listado.component.html',
  styleUrls: ['./receta-listado.component.scss'],
  providers: [DatePipe]
})
export class RecetaListadoComponent implements OnInit {

  public listaRecetas: Receta[] = [];

  private dataUser: AuthObject = {} as AuthObject;

  public mostrarPaciente: boolean = true;
  public mostrarDoctor: boolean = false;
  public mostrarFarmaceutico: boolean = false;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private accountService: LoginService,
              private clienteService: ClienteService,
              private medicoService: MedicoService,
              //private guards: GlobalGuardsGuard,
              private recetaService: RecetaService,
              private toastController: ToastController,
              private alertController: AlertController,
              private modalController: ModalController,
              public datepipe: DatePipe) {
  }


  ngOnInit(): void {

    const data = this.route.snapshot.data;
    console.log(data); // Accede a los datos aquí

    if (data['code'] === 'receta-list-medico') {
      this.mostrarPaciente = true;
      this.mostrarFarmaceutico = true;
    }
    if (data['code'] === 'receta-list-paciente') {
      this.mostrarDoctor = true;
    }
    console.log(this.mostrarPaciente, this.mostrarFarmaceutico, this.mostrarDoctor);
    // una vez este operativo, poner en false
    const saltarValidacion = false;
    if (this.accountService.sessionExists() || saltarValidacion) {
      this.dataUser = this.accountService.getDataUser();
      // buscar en base al rol el tipo de funcion que desempeña y que recetas tiene
      // por ejm, el cliente solo tiene sus recetas
      // docto solo las que emitio
      // farmaceutico todas where estado = "pendiente"
      if (this.accountService.isMedico() || saltarValidacion) {
        // carga los combos solo si es medico....
      }

      this.recetaService.getListaRecetas().subscribe({
        next: (data: Receta[]) => {
          console.log('getListaRecetas ', data);
          const soymedico = this.accountService.isMedico();
          this.listaRecetas = data;
          // this.listaRecetas = [];
          // for (const itemReceta of data) {
          //   if (soymedico && itemReceta.medico.id_medico === this.dataUser.medico?.id_medico) {
          //     this.listaRecetas.push(itemReceta);
          //   }
          //   if (!soymedico && itemReceta.paciente.id_paciente === this.dataUser.cliente?.id_cliente) {
          //     this.listaRecetas.push(itemReceta);
          //   }
          // }
        },
        error: (error: any) => {
          console.log('ERROR getListaRecetas: ', error);
          console.log(error.error.text);
        }
      });
    }
  }

  verReceta(itemReceta: Receta) {
    // console.log('hola coca cola')
    if (this.accountService.isMedico()) {
      this.router.navigate(['/medico/receta-vista/' + itemReceta.id_receta]);
    } else {
      this.router.navigate(['/home/paciente/receta-vista/' + itemReceta.id_receta]);
    }
  }

  getEstadoSeverity(element: string) {
    if (element === 'pendiente') {
      return 'primary';
    }
    if (element === 'entregado') {
      return 'success';
    }
    if (element === 'anulado') {
      return 'danger';
    }
    return 'secondary';
  }

  isNullOrUndefined(element: any) {
    return Global.isNullOrUndefined(element);
  }

  contarClaves(element: any) {
    return Global.contarClaves(element);
  }

  getEstadoColor(val: boolean) {
    return val ? GlobalStatus.success : GlobalStatus.warning;
  }

  getEstadoTexto(val: boolean) {
    return val? 'Habilitado' : 'Inactivo';
  }

  volverAtras() {
    history.back();
  }
}
