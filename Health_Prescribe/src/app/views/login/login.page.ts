import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from '../../services/login/login.service';
import {Login} from '../../modelos/Modelo';
import {ToastController} from "@ionic/angular";
import {Global, GlobalStatus} from "../../util/Global";

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage implements OnInit, AfterViewInit {

  username: string = '';
  password: string = '';

  constructor(private router: Router,
              private loginService: LoginService,
              private toastController: ToastController) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {

  }

  login() {
    const loginData: Login = {
      nombre_usuario: this.username,
      clave: this.password,
    };

    // Llama al servicio de inicio de sesión para autenticar al usuario
    this.loginService.login(loginData).subscribe(
      (response) => {
        // Aquí puedes realizar acciones después de una autenticación exitosa,
        // como almacenar información del usuario en el almacenamiento local
        // y redirigirlo a la página de inicio

        // Por ejemplo, puedes guardar el token de autenticación en el almacenamiento local
        // localStorage.setItem('authToken', response.token);

        // Redirige al usuario a la página de inicio
        console.log('datos de usuario', response);
        this.loginService.setDataUser(response);
        this.router.navigate(['/home']);
      },
      (error) => {
        // Aquí puedes manejar el caso de autenticación fallida
        console.error('Error al iniciar sesión:', error);
        let errorMsg = '';
        if (!Global.isNullOrUndefined(error.error.non_field_errors)) {
          errorMsg = error.error.non_field_errors;
          console.error('Error al iniciar sesión:', error.error.non_field_errors);
        } else{
          errorMsg = 'Ha ocurrido un problema :c';
        }
        Global.mostrarAlert(this.toastController, GlobalStatus.danger, errorMsg);
      }
    );
  }
}
