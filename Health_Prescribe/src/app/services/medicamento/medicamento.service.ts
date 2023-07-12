import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Global} from "../../util/Global";
import {Medicamento} from "../../modelos/Modelo";

@Injectable({
  providedIn: 'root'
})
export class MedicamentoService {

  private URL_SERVER = Global.urlServer;
  private basic_Schema = 'api/';

  constructor(private http: HttpClient) { }

  public getMedicamentos(): Observable<any> {
    return this.http.get(this.URL_SERVER + this.basic_Schema + 'medicamento/');
  }

  public insertMedicamentos(data: Medicamento): Observable<any> {
    return this.http.post(this.URL_SERVER + this.basic_Schema + 'medicamento/', data);
  }
  public updateMedicamentos(idMedicamento: number, data: Medicamento): Observable<any> {
    return this.http.put(this.URL_SERVER + this.basic_Schema + 'medicamento/' + idMedicamento + '/', data);
  }
}
