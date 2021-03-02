import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { DatosSessionService } from '../datos-session/datos-session.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private datosSessionService: DatosSessionService,
  ) {

  }

  tokenVencido(fechaToken) {
    let hoy = new Date();
    let respuesta = false;

    if (hoy.getTime() > fechaToken.getTime()) {
      respuesta = true;
    }

    return respuesta;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    let token = '';
    const tokenSession = this.datosSessionService.verificarToken();

    if (tokenSession != null) {
      token = tokenSession;
    }

    const authReq = req.clone({ setHeaders: { 'Authorization': 'Bearer ' + token } });
    // send cloned request with header to the next handler.
    return next.handle(authReq);
  }
}
