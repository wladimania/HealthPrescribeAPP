import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage {
  username: string='';
  password: string='';

  constructor(private router: Router) {}

  login() {
    // Aquí puedes agregar la lógica para autenticar al usuario utilizando los valores de username y password
    // por ejemplo, haciendo una llamada a la API de autenticación

    // Después de autenticar al usuario, puedes redirigirlo a otra página
    this.router.navigate(['/home']);
  }
}
