import { ParametrosApp } from './../../../admin-app/services/admin/parameters-config/parametros-app';
import { Sweetalert2Service } from './../../../admin-app/services/admin/sweetalert2/sweetalert2.service';
import { UserService } from './../../../admin-app/services/general/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-activar-cuenta',
  templateUrl: './activar-cuenta.component.html',
  styleUrls: ['./activar-cuenta.component.scss']
})
export class ActivarCuentaComponent implements OnInit {

  llave = null;

  tiposUsuario = this.parametrosApp.tiposUsuario;

  constructor(
    private parametrosApp: ParametrosApp,
    public actRoute: ActivatedRoute,
    public router: Router,
    private srvUser: UserService,
    private srvMensaje: Sweetalert2Service
  ) {
    this.llave = this.actRoute.snapshot.paramMap.get('llave');
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.activarCuenta();
  }

  /**
   * Metodo que recibe una cadena generada desde el servidor al momento de crear un usuario
   * para verificar y activar la cuenta
   */
  async activarCuenta() {
    try {
      this.srvMensaje.procesando('Activación de cuenta');
      const dataEnviar = {
        llave: this.llave
      }
      const respuesta = await this.srvUser.actionActivationAccount(dataEnviar).toPromise() as any;
      if (respuesta.estado == 'ok') {

        if (respuesta.token != null) {
          await this.srvUser.setToken(respuesta)
        }

        this.srvMensaje.enviarMensajeFuncion(null, respuesta.mensaje, 's', () => {
          if (respuesta.tipoUser == this.tiposUsuario.esChica) {
            this.router.navigate(['config-account', 'model']);
          } else if (respuesta.tipoUser == this.tiposUsuario.esEstudio) {

          } else {
            this.router.navigate(['login']);
          }
        });

      } else {
        this.srvMensaje.enviarMensajeFuncion('Error', respuesta.mensaje, 'e', () => {
          const win = window.open('about:blank', '_self');
          win.close();
        });
      }
      this.srvMensaje.cerrarMensaje();
    } catch (error) {
      this.srvMensaje.mensajeErrorServidor(error);
    }
  }

}
