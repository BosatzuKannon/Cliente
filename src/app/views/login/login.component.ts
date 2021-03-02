import { DatosSessionService } from './../../../admin-app/services/admin/seguridad/datos-session/datos-session.service';
import { Sweetalert2Service } from './../../../admin-app/services/admin/sweetalert2/sweetalert2.service';
import { UserService } from './../../../admin-app/services/general/user/user.service';
import { ParametrosApp } from './../../../admin-app/services/admin/parameters-config/parametros-app';
import * as clone from 'lodash/cloneDeep';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
  hide = true;

  usuario = {
    username: null,
    password: null
  }

  constructor(
    private router: Router,
    private parametrosApp: ParametrosApp,
    private srvUser: UserService,
    private srvMensaje: Sweetalert2Service,
    private srvDatosSession: DatosSessionService
  ) {

  }

  async ngOnInit() {
    await this.inicializarVariables();
  }


  /**
   * Metodo que inicia las variables
   */
  inicializarVariables() {
    const tokenDecode = this.srvDatosSession.decodeToken();
    if (tokenDecode) {
      this.router.navigate(['/']);
    }
  }


  /**
   * Metodo que redirecciona al registro de usuario
   */
  registro() {
    this.router.navigate(['/register']);
  }


  /**
   * Metodo que ejecuta el proceso de login en la aplicación
   * @param valid
   */
  async login(valid) {
    if (valid) {
      this.srvMensaje.procesando();
      try {
        const usuario = clone(this.usuario);
        const dataEnviar = {
          user: usuario
        }
        const respuesta = await this.srvUser.actionLogin(dataEnviar);
        if (respuesta.estado !== 'ok') {
          this.srvMensaje.enviarMensaje(respuesta.titulo, respuesta.mensaje, 'w');
        } else {
          this.router.navigate(['/']);
          this.srvMensaje.cerrarMensaje();
        }
      } catch (error) {
        this.srvMensaje.mensajeErrorServidor(error);
      }

    }

  }


}
