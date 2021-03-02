import { Observable } from 'rxjs';
import { DatosSessionService } from './../../admin/seguridad/datos-session/datos-session.service';
import { ParametrosApp } from './../../admin/parameters-config/parametros-app';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModeloWebcamService {
  ApiUrl: string;

  constructor(
    protected http: HttpClient,
    private parametrosApp: ParametrosApp,
    private srvDatosSession: DatosSessionService,
  ) {
    this.ApiUrl = [this.parametrosApp.ApiUrl, this.parametrosApp.petUrl, 'modelos-webcam'].join('/');
  }


  /**
   * Metodo que envia una petición al api para consultar todas los usuario de tipo esChica que se encuentren en estado aprobado
   * solo disponible para usuarios de tipo esChica
   */
  actionConsultarModelos(): Observable<any> {
    const url = [this.ApiUrl, 'action-consultar-modelos'].join('/');
    return this.http.get(url);
  }

}
