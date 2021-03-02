import { CookieService } from 'ngx-cookie-service';
import { ParametrosApp } from './../../parameters-config/parametros-app';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

/**
 * variable para la administracion de JWT
 */
const helper = new JwtHelperService();

/**
 * Permite obtener la informacion del token serializado para realizar la validacion de la sesion
 */
@Injectable({
  providedIn: 'root'
})
export class DatosSessionService {

  /**
   * nombre del token de sesion
   */
  nomKeyToken: string;

  /**
   * constructor de la clase inicializa y define el nombre del token de sesion
   * @param {CookieService} cookieService servicio para administrar cookies
   */
  constructor(
    private parametrosApp: ParametrosApp,
    private srvCookie: CookieService
  ) {
    this.nomKeyToken = parametrosApp.nomToken;
  }

  /**
   * Funcion que permite verificar la autenticidad del token de sesion
   */
  verificarToken() {
    let token = this.getToken();

    if (token) {
      try {
        //Verificamos si esta vigente
        const isExpired = helper.isTokenExpired(token);
        if (!isExpired) {
          token = token;
        } else {
          token = null;
          this.deletToken();
          console.log('isExpired :> ', isExpired);
        }
      } catch (error) {

      }
    }
    return token;
  }

  setToken(token) {
    this.srvCookie.set(this.nomKeyToken, token);
    // localStorage.setItem(this.nomKeyToken, token);
  }

  getToken() {
    let retorno = null;
    try {
      const existe = this.srvCookie.check(this.nomKeyToken);
      // const existe = localStorage.getItem(this.nomKeyToken);
      if (existe) {
        retorno = this.srvCookie.get(this.nomKeyToken);
        // retorno = localStorage.getItem(this.nomKeyToken);
      }
    } catch (error) {
      retorno = null;
      console.log('error get token ', error);
    }
    return retorno;
  }

  decodeToken() {
    const token = this.verificarToken();
    if (token) {
      const decodedToken = helper.decodeToken(token);
      return decodedToken;
    } else {
      return null;
    }
  }

  deletToken() {
    const existe = this.srvCookie.check(this.nomKeyToken);
    // const existe = localStorage.getItem(this.nomKeyToken);
    if (existe) {
      this.srvCookie.delete(this.nomKeyToken);
      // localStorage.removeItem(this.nomKeyToken);
    }
  }

}
