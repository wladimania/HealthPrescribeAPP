import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RecetaCreate, RecetaDetalleCreate } from 'src/app/modelos/Modelo';
import { Global } from 'src/app/util/Global';

@Injectable({
  providedIn: 'root'
})
export class RecetaService {

  private URL_SERVER = Global.urlServer;

  private basic_Schema = 'api/';

  constructor(private http: HttpClient) { }

  getListaRecetas(): Observable<any> {
      return this.http.get(this.URL_SERVER + this.basic_Schema + 'receta/');
  }
  getRecetas(recetaId: number): Observable<any> {
      return this.http.get(this.URL_SERVER + this.basic_Schema + 'detallereceta/?id_receta=' + recetaId);
  }

  createReceta(recetaItem: RecetaCreate): Observable<any> {
      return this.http.post(this.URL_SERVER + this.basic_Schema + 'Create_Receta/', recetaItem);
  }

  updateReceta(idReceta: number, recetaItem: RecetaCreate): Observable<any> {
      return this.http.put(this.URL_SERVER + this.basic_Schema + 'Create_Receta/' + idReceta + '/', recetaItem);
  }

  createRecetaDetalle(recetaItem: RecetaDetalleCreate): Observable<any> {
      return this.http.post(this.URL_SERVER + this.basic_Schema + 'CrearRecetaListado/', recetaItem);
  }

  buscarPorCodigoReceta(codigoReceta: string): Observable<any> {
      // http://127.0.0.1:8000/api/Create_Receta/?search=987654321
      return this.http.get(this.URL_SERVER + this.basic_Schema + 'recetas/?search=' + codigoReceta);
  }
}
