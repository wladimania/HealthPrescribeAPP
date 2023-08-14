import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Global} from "../../util/Global";
import {AuthObject, Login, Usuarios} from "../../modelos/Modelo";

@Injectable({
  providedIn: 'root'
})


@Injectable()
export class LoginService {

  private URL_SERVER = Global.urlServer;
  private basic_Schema = 'api/';

  constructor(private http: HttpClient) { }

  public setDataUser(data: AuthObject) {
    console.log('sessionExists ', this.sessionExists());
    if(!this.sessionExists()) {
      localStorage.setItem(Global.userKey, JSON.stringify(data));
    }
  }

  public getDataUser(): AuthObject {
    if(this.sessionExists()) {
      const objS = localStorage.getItem(Global.userKey);
      if (objS !== null && !Global.isNullOrUndefined(objS)) {
        return (JSON.parse(objS) as AuthObject);
      }
    }
    return {};
  }

  public sessionExists(): boolean {
    return localStorage.getItem(Global.userKey) !== null;
  }

  public removeAccount() {
    localStorage.removeItem(Global.userKey);
  }

  public isCliente(): boolean {
    return this.havePrivilege(Global.rolCliente);
  }

  public isFarmaceutico(): boolean {
    return this.havePrivilege(Global.rolFarmaceutico);
  }

  public isMedico(): boolean {
    return this.havePrivilege(Global.rolMedico);
  }

  public havePrivilege(privilege: number): boolean {
    const account: AuthObject = this.getDataUser();
    console.log('paso 1: ' + privilege);
    if (account) {
      console.log('paso 2');
      if (!Global.isNullOrUndefined(account.persona)) {
        console.log('paso 3');
        console.log('rol ', account.persona!.roles.id_rol  + '===' + privilege, (account.persona!.roles.id_rol === privilege));
        return (account.persona!.roles.id_rol === privilege);
      }
    }
    return false;
  }

  login(obj: Login): Observable<any> {
    return this.http.post(this.URL_SERVER + this.basic_Schema + 'login/', obj);
  }
}
