import { ModeloWebcamService } from './../../../../admin-app/services/general/modelo-webcam/modelo-webcam.service';
import { Router } from '@angular/router';
import { UserService } from './../../../../admin-app/services/general/user/user.service';
import { WebsocketService } from './../../../../admin-app/services/general/websocket/websocket.service';
import { DatosSessionService } from './../../../../admin-app/services/admin/seguridad/datos-session/datos-session.service';
import { ParametrosApp } from './../../../../admin-app/services/admin/parameters-config/parametros-app';
import { Subscription } from 'rxjs';
import { ChatService } from './../../../../admin-app/services/general/chat/chat.service';
import { Sweetalert2Service } from './../../../../admin-app/services/admin/sweetalert2/sweetalert2.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  // userSubscription: Subscription;
  userConfigSubscription: Subscription;
  userRemoveSubscription: Subscription;

  user = null;

  lstModelos = [];

  constructor(
    private router: Router,
    public parametrosApp: ParametrosApp,
    public chatService: ChatService,
    private srvMensaje: Sweetalert2Service,
    private srvDatosSession: DatosSessionService,
    private srvWebsocket: WebsocketService,
    private srvUser: UserService,
    private srvModeloWebcam: ModeloWebcamService,
  ) {

  }


  async ngOnInit() {

  }


  /**
   * Metodo que elimina los subscribe si se cierra el componente
   */
  ngOnDestroy() {
    // if (this.userSubscription) {
    //   this.userSubscription.unsubscribe();
    // }

    if (this.userConfigSubscription) {
      this.userConfigSubscription.unsubscribe();
    }

    if (this.userRemoveSubscription) {
      this.userRemoveSubscription.unsubscribe();
    }

  }


  /**
   * Metodo que se inicia despues de que renderiza la vista y llama a los metodos necesarios
   */
  ngAfterContentInit() {
    this.consultarInformacion();
  }


  /**
   * Metodo que realiza una petición para que retorne la lista de modelos registradas y aprobadas
   */
  async consultarInformacion() {
    try {
      const token = this.srvDatosSession.getToken();
      if (token != null) {
        this.user = await this.srvUser.actionInfoToken().toPromise();
        await this.srvWebsocket.loginWS(token);
      }

      const respuesta = await this.srvModeloWebcam.actionConsultarModelos().toPromise();
      this.lstModelos = respuesta.lstModelos;

      this.iniciarEscucha();
    } catch (error) {
      console.log('error ', error);
    }
  }

  /**
   * Metodo que inicia la escucha de los eventos socket
   */
  iniciarEscucha() {
    // this.userSubscription = this.chatService.getUser().subscribe((usuarios: any) => {
    //   console.log('usuarios ', usuarios);
    //   usuarios.users.forEach(cliente => {
    //     if (cliente.id != null && cliente.tipoUser == 'esChica') {
    //       const obj = this.lstModelos.find(mif => mif.id == cliente.id);
    //       if (obj == null) {

    //         let agregar = false;

    //         if (this.user == null) {
    //           agregar = true;
    //         } else if (this.user != null && this.user._id != cliente.id) {
    //           agregar = true;
    //         }

    //         if (agregar) {
    //           console.log('se agrego ');
    //         } else {
    //           console.log('No se agrego ');
    //         }

    //       } else {
    //         console.log('Esta en lista');
    //       }
    //     }

    //   });

    // });

    // Subscription para los usuarios que hicieron login en el api
    this.userConfigSubscription = this.chatService.getUserConfig().subscribe((usuarios: any) => {
      usuarios.users.forEach(cliente => {
        if (cliente.id != null && cliente.tipoUser == 'esChica') {
          const obj = this.lstModelos.find(mif => mif.id == cliente.id);
          if (obj == null) {

            let agregar = false;

            if (this.user == null) {
              agregar = true;
            } else if (this.user != null && this.user._id != cliente.id) {
              agregar = true;
            }

            if (agregar) {
              console.log('Se agrego un usuario conectado');
            }

          }
        }

      });

    });

    // Subscription para los usuarios que salieron de la pestaña
    this.userRemoveSubscription = this.chatService.getUserRemove().subscribe((usuario: any) => {
      console.log('usuarios salio', usuario);
      // tslint:disable-next-line: prefer-for-of
      for (let index = 0; index < this.lstModelos.length; index++) {
        const element = this.lstModelos[index];
        if (element.id == usuario.cliente.id && element.idSocket == usuario.cliente.idSocket) {

          break;
        }
      }
    });
  }

  /**
   * Metodo que redirecciona a la pagina de la modelo
   * @param item objeto de la modelo disponible
   */
  verModelo(item) {
    // this.router.navigateByUrl('/view-model/model/'+item.id);
    this.router.navigate(['view-model', 'model', item.username]);
    // location.href = ['view-model', 'model', item.id].join('/');
  }
}
