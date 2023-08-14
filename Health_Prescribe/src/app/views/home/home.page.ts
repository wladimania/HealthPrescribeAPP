import { Component } from '@angular/core';
import { Login,AuthObject } from 'src/app/modelos/Modelo';
import {LoginService} from '../../services/login/login.service';
import {ActivatedRoute, Route, Router} from "@angular/router";

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
              private route: ActivatedRoute) {}
  ngOnInit() {
    this.dataUser = this.accountService.getDataUser();

    this.model = [];

    if (this.accountService.isMedico()) {
        this.model.push({
            label: 'Médico',
            items: [
                {label: 'Registrar Receta', icon: 'create', routerLink: ['/generar-receta']},
                {label: 'Mostrar Recetas', icon: 'document-text', routerLink: ['/mostrar-receta']},

            ]
        });
    }
    if (this.accountService.isFarmaceutico()) {
        this.model.push({
            label: 'Farmacutico',
            items: [
                {label: 'Mostrar Recetas', icon: 'paper-plane', routerLink: ['/entregar-receta']},
                {label: 'Inventario', icon: 'list', routerLink: ['/inventario']},
            ]
        });
    }
    if (this.accountService.isCliente()) {
        this.model.push({
            label: 'Cliente',
            items: [
                {label: 'Mostrar Recetas', icon: 'document-text', routerLink: ['/mostrar-receta']},
            ]
        });
    }
}

cerrarSession() {
    this.accountService.removeAccount();
    this.router.navigate(['/login']);
}
}
