import {Component} from '@angular/core';
import {Login, AuthObject} from 'src/app/modelos/Modelo';
import {LoginService} from '../../services/login/login.service';
import {ActivatedRoute, Route, Router} from "@angular/router";
import {Global} from "../../util/Global";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  model: any[] = [];

  public dataUser: AuthObject = {};

  constructor(private accountService: LoginService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.dataUser = this.accountService.getDataUser();

    this.model = [];

    if (this.accountService.isMedico()) {
      this.model.push({
        label: 'Médico',
        items: [
          {label: 'Registrar Receta', icon: 'create', routerLink: ['/generar-receta']},
          {label: 'Mostrar Recetas', icon: 'document-text', routerLink: ['/listar-receta']},

        ]
      });
    } else if (this.accountService.isFarmaceutico()) {
      this.model.push({
        label: 'Farmacutico',
        items: [
          {label: 'Mostrar Recetas', icon: 'paper-plane', routerLink: ['/entregar-receta']},
          {label: 'Inventario', icon: 'list', routerLink: ['/inventario']},
        ]
      });
    } else if (this.accountService.isCliente()) {
      this.model.push({
        label: 'Cliente',
        items: [
          {label: 'Mostrar Recetas', icon: 'document-text', routerLink: ['/listar-receta']},
        ]
      });
    } else {
      this.model.push({
        label: 'SIN USUARIO',
        items: []
      });
    }
  }

  cerrarSession() {
    this.accountService.removeAccount();
    this.router.navigate(['/login']);
  }

  navigateTo(page: string) {
    this.router.navigate(['/home' + page]);
  }

  obtenerNombrePesona() {
    if (Global.isNullOrUndefined(this.dataUser) || Global.isNullOrUndefined(this.dataUser.persona)){
      return '-- --';
    }
    return this.dataUser.persona?.apellido + ' ' + this.dataUser.persona?.nombre;
  }
}
