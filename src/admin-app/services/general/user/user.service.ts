import { WebsocketService } from './../websocket/websocket.service';
import { DatosSessionService } from './../../admin/seguridad/datos-session/datos-session.service';
import { ParametrosApp } from './../../admin/parameters-config/parametros-app';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as crypto from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  ApiUrl: string;

  constructor(
    protected http: HttpClient,
    private parametrosApp: ParametrosApp,
    private srvDatosSession: DatosSessionService,
    private srvWebsocket: WebsocketService
  ) {
    this.ApiUrl = [this.parametrosApp.ApiUrl, this.parametrosApp.petUrl, 'user'].join('/');
  }


  /**
   * Metodo que realiza una petición al api para realizar el login, este metodo encripta  password digitado y de ser correcta la
   * autenticación setea llama al metodo para setear token y auntenticar el el socket
   * @param data {username: '', password:''}
   */
  async actionLogin(data) {
    try {

      const clave = crypto.SHA384(data.user.password).toString();
      data.user.password = clave;

      const url = [this.ApiUrl, 'action-login'].join('/');
      const respuesta = await this.http.post(url, data).toPromise() as any;

      if (respuesta.estado === 'ok') {
        await this.setToken(respuesta);
      }
      return respuesta;
    } catch (error) {
      throw (error);
    }
  }


  /**
   * Metodo que genera la Cookie para la autenticación en la api y le da un idtoken al socket
   * @param data {token:''} el data debe contener token generado por la api
   */
  async setToken(data) {
    this.srvDatosSession.setToken(data.token);
    await this.srvWebsocket.loginWS(data.token);
  }


  /**
   * Metodo que envia una petición al api para obtener información del token que se encuentra en la cookie
   */
  actionInfoToken(): Observable<any> {
    const url = [this.ApiUrl, 'action-info-token'].join('/');
    return this.http.get(url);
  }


  /**
   * Metodo que envia una petición al api para obtener información del usuario autenticado
   */
  actionInfoLogin(): Observable<any> {
    const url = [this.ApiUrl, 'action-info-login'].join('/');
    return this.http.get(url);
  }


  /**
   * Metodo que envia una petición al api para registrar un nuevo usuario y enviar un email
   * @param data El modelo necesario para que el api genere el registro
   */
  actionRegistrarEnviarEmail(data) {
    const url = [this.ApiUrl, 'action-registrar-enviar-email'].join('/');
    return this.http.post(url, data);
  }


  /**
   * Metodo que envia una petición al api para activar la cuenta previamente registrada
   * @param data JSON con la información necesaria pedida por el api para realizar la activación
   */
  actionActivationAccount(data) {
    const url = [this.ApiUrl, 'action-activation-account'].join('/');
    return this.http.post(url, data);
  }


  /**
   * Metodo que envia una petición al api para guardar los datos de la solicitud, disponible actalmente solo para usuarios
   * de tipo esChica
   * @param data JSON con la información necesaria pedida por el api para guardar la solicitud
   */
  actionGuardarSolicitud(data = {}, files: Array<any>): Observable<any> {
    let uploadData = new FormData();
    uploadData.append('data', JSON.stringify(data));
    for (const item of files) {
      uploadData.append(item.descripcion, item.archivo, item.archivo.name);
    }

    const ruta = [this.ApiUrl, 'action-guardar-solicitud'].join('/');
    return this.http.post(ruta, uploadData);
  }


  /**
   * Metodo que envia una petición al api para guardar las preferencias de la modelo
   * solo disponible para usuarios de tipo esChica
   * @param data JSON con la información necesaria pedida por el api para guardar la solicitud
   */
  actionGuardarPreferencias(data): Observable<any> {
    const ruta = [this.ApiUrl, 'action-guardar-preferencias'].join('/');
    return this.http.post(ruta, data);
  }


  /**
   * Metodo que envia una petición al api para guardar las imagenes de la galeria de la modelo
   * @param data JSON con la información necesaria pedida por el api para guardar la información
   * @param files Array de archivos de tipo imagen
   */
  actionGuardarImagenes(data = {}, files: Array<any>): Observable<any> {
    let uploadData = new FormData();
    uploadData.append('data', JSON.stringify(data));
    for (const item of files) {
      uploadData.append(item.descripcion, item.archivo, item.archivo.name);
    }

    const ruta = [this.ApiUrl, 'action-guardar-imagenes'].join('/');
    return this.http.post(ruta, uploadData);
  }


  /**
   * Metodo que envia una petición al api para eliminar la imagen de la galeria de la modelo
   * solo disponible para usuarios de tipo esChica
   * @param data JSON con la información necesaria pedida por el api para eliminar la imagen
   */
  actionEliminarImagen(data): Observable<any> {
    const ruta = [this.ApiUrl, 'action-eliminar-imagen'].join('/');
    return this.http.post(ruta, data);
  }


  /**
   * Metodo que envia una petición al api para cosultar las imagenes guardadas por la modelo
   * solo disponible para usuarios de tipo esChica
   * @param data JSON con la información necesaria pedida por el api para consultar la galeria
   */
  actionConsultarGaleria(data) {
    const ruta = [this.ApiUrl, 'action-consultar-galeria'].join('/');
    return this.http.post(ruta, data);
  }

}
