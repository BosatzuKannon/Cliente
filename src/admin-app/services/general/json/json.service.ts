import { Observable } from 'rxjs';
import { DatosSessionService } from '../../admin/seguridad/datos-session/datos-session.service';
import { ParametrosApp } from '../../admin/parameters-config/parametros-app';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JsonService {

  ApiUrl: string;

  constructor(
    protected http: HttpClient,
    private parametrosApp: ParametrosApp,
    private srvDatosSession: DatosSessionService,
  ) {
    this.ApiUrl = [this.parametrosApp.ApiUrl, this.parametrosApp.petUrl, 'json'].join('/');
  }

  /**
   * Metodo que envia una petición al api para consultar la lista de parametros
   * @param data JSON con la información necesaria pedida por el api realizar la consulta
   */
  actionDarParametrosRegistro(data): Observable<any> {
    const url = [this.ApiUrl, 'action-consultar-parametros-registro'].join('/');
    return this.http.post(url, data);
  }


}
