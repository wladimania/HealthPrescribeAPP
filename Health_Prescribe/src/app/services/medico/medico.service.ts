import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Global } from 'src/app/util/Global';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  private URL_SERVER = Global.urlServer;

  private basic_Schema = 'api/';

  constructor(private http: HttpClient) { }

  getInfoMedico(personaId: number): Observable<any> {
      return this.http.get(this.URL_SERVER + this.basic_Schema + 'medicos/' + personaId);
  }
}
