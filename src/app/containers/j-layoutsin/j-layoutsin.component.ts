import { DatosSessionService } from './../../../admin-app/services/admin/seguridad/datos-session/datos-session.service';
import { UserService } from './../../../admin-app/services/general/user/user.service';
import { ParametrosApp } from './../../../admin-app/services/admin/parameters-config/parametros-app';
import { Component, Input } from '@angular/core';
import { navItems } from '../../_nav';
import { Router, ActivatedRoute } from '@angular/router';

/**
 * COomponente encargado de presentar la vista generica sin sidebar para todo el sistema SAPIENS
 */
@Component({
  selector: 'app-jdashboard',
  templateUrl: './j-layoutsin.component.html',
  styleUrls: ['./j-layoutsin.component.scss']
})
export class JLayoutsinComponent {
  user = null;
  infoToken = null;
  tiposUsuario = this.parametrosApp.tiposUsuario;

  constructor(
    public parametrosApp: ParametrosApp,
    private router: Router,
    private srvUser: UserService,
    private srvDatosSession: DatosSessionService
  ) {
  }

  ngOnInit() {
  }

  ngAfterContentInit() {
    this.validarPendiente();
  }

  async validarPendiente() {
    const tokenDecode = this.srvDatosSession.decodeToken();
    if (tokenDecode) {
      this.user = tokenDecode;
      this.infoToken = await this.srvUser.actionInfoLogin().toPromise();
    }
    if (this.user != null && this.infoToken != null && this.infoToken.estadoSolicitud == 'pendiente') {
      if (this.infoToken?.tipoUser == this.tiposUsuario.esChica) {
        this.router.navigate(['config-account', 'model']);
      }

    }
  }


  async cerrarSesion() {
    await this.srvDatosSession.deletToken();
    this.user = null;
    this.infoToken = null;
    setTimeout(() => {
      this.router.navigate(['/']);
      // this.router.navigate(['/'])
      //     .then(() => {
      //       location.reload();
      //     });
    }, 1000)
  }

  login() {
    this.router.navigate(['/login']);
  }


  trasmitirModelo() {
    this.router.navigate(['/web-cam/model']);
  }


  puedeModificarCuenta() {
    let retorno = false;
    if (this.infoToken != null && this.infoToken.correoConfirmado && this.infoToken.estadoSolicitud == 'aprobado') {
      retorno = true;
    }

    return retorno;
  }


  miCuenta() {
    if (this.infoToken != null) {
      if (this.infoToken?.tipoUser == this.tiposUsuario.esChica) {
        this.router.navigate(['/my-account/model']);
      }

    }

  }

  puedeTrasmitir() {
    let retorno = false;
    if (this.infoToken != null && this.infoToken.correoConfirmado && this.infoToken.estadoSolicitud == 'aprobado' &&
      (this.infoToken?.tipoUser == this.tiposUsuario.esChica || this.infoToken?.tipoUser == this.tiposUsuario.esEstudio)) {

      retorno = true;
    }

    return retorno;

  }

}
