import {Component, OnInit} from '@angular/core';
import {Global, GlobalStatus} from "../../util/Global";
import {
    AuthObject,
    DetalleReceta,
    Medico,
    Paciente,
    Receta,
    RecetaCreate,
    RecetaDetalle,
    RecetaDetalleCreate
} from "../../modelos/Modelo";
import {ClienteService} from "../../services/cliente/cliente.service";
import {AlertController, ModalController, ToastController} from "@ionic/angular";
import {FarmacosDialogComponent} from "../farmacos-dialog/farmacos-dialog.component";
import {LoginService} from "../../services/login/login.service";
import {ConsoleLogger} from "@angular/compiler-cli";
import {RecetaService} from "../../services/receta/receta.service";
import {DatePipe} from "@angular/common";

@Component({
    selector: 'app-receta-create',
    templateUrl: './receta-create.component.html',
    styleUrls: ['./receta-create.component.scss'],
    providers: [DatePipe]
})
export class RecetaCreateComponent implements OnInit {

    public recetaEncabezado: Receta = {} as Receta;

    public listaPacientes: Paciente[] = [];
    public nuevoItemReceta: DetalleReceta = {} as DetalleReceta;
    public recetaDetalle: DetalleReceta[] = [];

    private dataUser: AuthObject = {} as AuthObject;
    private datosMedico: Medico = {} as Medico;

    constructor(private clienteService: ClienteService,
                private accountService: LoginService,
                private recetaService: RecetaService,
                private modalController: ModalController,
                private alertController: AlertController,
                public toastController: ToastController,
                public datepipe: DatePipe) {
    }

    ngOnInit() {

        if (this.accountService.sessionExists()) {
            this.dataUser = this.accountService.getDataUser();
            console.log('datos de usuario', this.dataUser);
            if (Global.contarClaves(this.dataUser) > 0) {
                if (this.accountService.isMedico()) {
                    this.datosMedico = this.dataUser.medico!;
                }
            }
        }
        this.clienteService.getListaClientes().subscribe({
            next: (data: Paciente[]) => {
                console.log('getListaClientes ', data);
                this.listaPacientes = data;
            },
            error: (error) => {
                console.log('ERROR getListaClientes: ', error);
                console.log(error.error.text);
            }
        });
    }


    volverAtras() {
        history.back();
    }

    contarClaves(data: any): number {
        return Global.contarClaves(data);
    }

    async showfarmacosModal() {
        // this.ref = this.dialogService.open(FarmacosDialogComponent, {
        //   header: 'Seleccione un Fármaco',
        //   width: '70%',
        //   contentStyle: { overflow: 'auto' },
        //   baseZIndex: 10000,
        //   maximizable: true
        // });
        // this.ref.onClose.subscribe((farmaco: Farmaco) => {
        //   if (farmaco) {
        //     this.messageService.add({ severity: 'info', summary: 'Fármaco Seleccionado', detail: farmaco.nombre_generico });
        //     this.nuevoItemReceta = {} as RecetaDetalle;
        //     this.nuevoItemReceta.farmaco = farmaco;
        //   }
        // });

        const modal = await this.modalController.create({
            component: FarmacosDialogComponent,
            cssClass: 'mi-modal-clase', // Opcional: Clase CSS personalizada para el modal
        });
        modal.onDidDismiss().then((data) => {
            if (data && data.data) {
                const datosRecibidos = data.data;
                console.log('Datos recibidos:', datosRecibidos);
                this.nuevoItemReceta.medicamento = datosRecibidos;
            }
        });


        await modal.present();
    }

    agregarTmpFarmaco() {
        if (Global.isNullOrUndefined(this.nuevoItemReceta.cantidad) || !this.nuevoItemReceta.cantidad || this.nuevoItemReceta.cantidad <= 0) {
            Global.mostrarAlert(this.toastController, GlobalStatus.warning, 'Fármaco Seleccionado: Indique la cantidad');
            return;
        }
        if (Global.isNullOrUndefined(this.nuevoItemReceta.indicaciones) || this.nuevoItemReceta.indicaciones.length <= 0) {
            Global.mostrarAlert(this.toastController, GlobalStatus.warning, 'Fármaco Seleccionado: Establezca las indicaciones');
            return;
        }
        if (!this.nuevoItemReceta.cantidad || this.nuevoItemReceta.cantidad > this.nuevoItemReceta.medicamento.cantidad) {
            Global.mostrarAlert(this.toastController, GlobalStatus.warning, 'Fármaco Seleccionado: La cantidad no debe superar el inventario');
            return;
        }
        //
        let index = this.buscarFarmacoAgregado(this.nuevoItemReceta);
        if (index === -1) {
            // es un elemento nuevo
            this.recetaDetalle.push(this.nuevoItemReceta);
        } else {
            // el elemento ya existe
            // validar el existente mas lo nuevo no supere stock
            // @ts-ignore
            if ((this.recetaDetalle[index].cantidad + this.nuevoItemReceta.cantidad) > this.nuevoItemReceta.medicamento.cantidad) {
                Global.mostrarAlert(this.toastController, GlobalStatus.warning, 'Fármaco Seleccionado: La cantidad no debe superar el inventario');
                return;
            } else {
                // solo sumar cantidad
                // @ts-ignore
                this.recetaDetalle[index].cantidad += this.nuevoItemReceta.cantidad;
            }
        }
        this.clearTmpFarmaco();
    }

    clearTmpFarmaco() {
        this.nuevoItemReceta = {} as DetalleReceta;
    }

    buscarFarmacoAgregado(recetaDetalle: DetalleReceta): number {
        for (let ind = 0; ind < this.recetaDetalle.length; ind++) {
            if (this.recetaDetalle[ind].medicamento.id_medicamento === recetaDetalle.medicamento.id_medicamento) {
                return ind;
            }
        }
        return -1;
    }

    removerFarmaco(itemIndex: number) {
        this.recetaDetalle.splice(itemIndex, 1);
    }

    async clearReceta() {
        const alert = await this.alertController.create({
            header: 'Cancelar',
            message: 'Si confirma, se perderá la receta que estaba creando',
            backdropDismiss: false, // Evita que se cierre al tocar fuera del cuadro de diálogo
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                        // Función de manejo cuando se hace clic en "Cancelar"
                    },
                },
                {
                    text: 'Confirmar',
                    handler: () => {
                        Global.mostrarAlert(this.toastController, GlobalStatus.primary, 'Completado: Se limpió el formulario');
                        this.clearTmpFarmaco();
                        this.clearDataReceta();
                    },
                },
            ],
        });

        await alert.present();
    }

    clearDataReceta() {
        this.recetaEncabezado = {} as Receta;
        this.recetaEncabezado.codigo_receta = new Date().getTime().toString();
        this.recetaEncabezado.estado = 'pendiente';
        this.recetaEncabezado.medico = this.datosMedico;
        this.recetaDetalle = [];
    }

    castDate(fecha: Date) {
        return Global.castDateF2(this.datepipe, fecha);
    }

    async guardarReceta() {
        // this.confirmationService.confirm({
        //   message: '¿Esta seguro de querer guardar esta receta?',
        //   header: 'Guardar',
        //   icon: 'pi pi-check-circle',
        //   accept: () => {
        const alert = await this.alertController.create({
            header: 'Guardar',
            message: '¿Está seguro de querer guardar esta receta?',
            backdropDismiss: false, // Evita que se cierre al tocar fuera del cuadro de diálogo
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {

                    },
                },
                {
                    text: 'Guardar',
                    handler: () => {
                        const recetaCreateEncabezado: RecetaCreate = {} as RecetaCreate;
                        recetaCreateEncabezado.paciente = this.recetaEncabezado.paciente.id_paciente;
                        recetaCreateEncabezado.medico = 5;//this.datosMedico.id_medico;
                        recetaCreateEncabezado.fecha = this.castDate(new Date());
                        recetaCreateEncabezado.habilitada = true;
                        if (!Global.isNullOrUndefined(this.recetaEncabezado.medico)) {
                            // recetaCreateEncabezado.medico = this.recetaEncabezado.medico.id_medico;
                        }
                        if (!Global.isNullOrUndefined(this.recetaEncabezado.paciente)) {
                            // recetaCreateEncabezado.paciente = this.recetaEncabezado.paciente.id_cliente;
                        }
                        // if (!Global.isNullOrUndefined(this.recetaEncabezado.farmaceutico)) {
                        //     recetaCreateEncabezado.farmaceutico = this.recetaEncabezado.farmaceutico.id_farmaceutico;
                        // }
                        console.log('encabezado de receta', recetaCreateEncabezado);
                        this.recetaService.createReceta(recetaCreateEncabezado).subscribe({
                            next: (data: Receta) => {
                                console.log('createReceta ', data);
                                Global.mostrarAlert(this.toastController, GlobalStatus.success, 'Completado: Se guardó la receta.');

                                for (const itemRecetaDetalle of this.recetaDetalle) {
                                    const itemRecetaCreateDetalle: RecetaDetalleCreate = {} as RecetaDetalleCreate;
                                    itemRecetaCreateDetalle.receta = data.id_receta;
                                    itemRecetaCreateDetalle.cantidad = itemRecetaDetalle.cantidad!;
                                    itemRecetaCreateDetalle.indicaciones = itemRecetaDetalle.indicaciones;
                                    itemRecetaCreateDetalle.medicamento = itemRecetaDetalle.medicamento.id_medicamento;

                                    this.recetaService.createRecetaDetalle(itemRecetaCreateDetalle).subscribe({
                                        next: (data: RecetaCreate) => {
                                            console.log('createRecetaDetalle ', data);
                                        },
                                        error: (error: any) => {
                                            console.log('ERROR createRecetaDetalle: ', error);
                                            console.log(error.error.text);
                                            Global.mostrarAlert(this.toastController, GlobalStatus.danger, 'Error: Problema en el detalle de la receta.');
                                        }
                                    });
                                }

                                this.clearTmpFarmaco();
                                this.clearDataReceta();
                            },
                            error: (error: any) => {
                                console.log('ERROR createReceta: ', error);
                                console.log(error.error.text);
                                Global.mostrarAlert(this.toastController, GlobalStatus.danger, 'Error: No se registró la receta');
                            }
                        });
                    },
                },
            ],
        });

        await alert.present();

    }

    cambioPac(){
        console.log('xxx', this.recetaEncabezado.paciente)
    }
}
