import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Farmaco } from 'src/app/modelos/Modelo';
import { Global } from 'src/app/util/Global';

@Injectable({
  providedIn: 'root'
})
export class FarmacoService {

  private URL_SERVER = Global.urlServer;

  private basic_Schema = 'api/';

  constructor(private http: HttpClient) { }

  getListaFarmacos(): Observable<any> {
      return this.http.get(this.URL_SERVER + this.basic_Schema + 'farmacos/');
  }
  createFarmaco(data: Farmaco): Observable<any> {
      return this.http.post(this.URL_SERVER + this.basic_Schema + 'farmacos/', data);
  }
  updateFarmaco(idFarmaco: number, data: Farmaco): Observable<any> {
      return this.http.put(this.URL_SERVER + this.basic_Schema + 'farmacos/' + idFarmaco + '/', data);
  }

  getListaProveedor(): Observable<any> {
      return this.http.get(this.URL_SERVER + this.basic_Schema + 'Proveedor/');
  }
}
