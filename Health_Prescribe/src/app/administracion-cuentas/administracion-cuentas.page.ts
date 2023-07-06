import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Cuenta {
  nombre: string;
  habilitado: boolean;
}

@Component({
  selector: 'app-administracion-cuentas',
  templateUrl: './administracion-cuentas.page.html',
  styleUrls: ['./administracion-cuentas.page.scss'],
})
export class AdministracionCuentasPage {
  listaMedicos: Cuenta[] = [
    { nombre: 'Médico 1', habilitado: true },
    { nombre: 'Médico 2', habilitado: false },
    { nombre: 'Médico 3', habilitado: true },
  ];

  listaPacientes: Cuenta[] = [
    { nombre: 'Paciente 1', habilitado: true },
    { nombre: 'Paciente 2', habilitado: true },
    { nombre: 'Paciente 3', habilitado: false },
  ];

  listaFarmaceuticos: Cuenta[] = [
    { nombre: 'Farmacéutico 1', habilitado: true },
    { nombre: 'Farmacéutico 2', habilitado: false },
    { nombre: 'Farmacéutico 3', habilitado: true },
  ];

  cambiarEstadoCuenta(cuenta: Cuenta) {
    // Lógica para cambiar el estado de la cuenta (habilitar/inhabilitar)
    cuenta.habilitado = !cuenta.habilitado;
    console.log('Estado de cuenta cambiado:', cuenta);
  }
}
