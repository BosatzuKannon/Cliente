import { DatosSessionService } from './../../../../admin-app/services/admin/seguridad/datos-session/datos-session.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from './../../../../admin-app/services/general/user/user.service';
import { ChatService } from './../../../../admin-app/services/general/chat/chat.service';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  @Input() idSala = null;
  @Input() uso = null;

  texto = '';
  mensajesSubscription: Subscription;
  elemento: HTMLElement;

  mensajes: any[] = [];

  user = null;
  infoToken = null;

  constructor(
    public actRoute: ActivatedRoute,
    public router: Router,
    public chatService: ChatService,
    private srvUser: UserService,
    private srvDatosSession: DatosSessionService
  ) {

  }

  ngOnInit() {
    this.consultarInformacion();
  }


  /**
   * Destruye las suscripciones que se utilizan para que optimizacion de memoria
   */
  ngOnDestroy() {
    this.mensajesSubscription.unsubscribe();
  }


  /**
   * Metodo que consulta la información del usuario que esta en el chat
   */
  async consultarInformacion() {

    const tokenDecode = this.srvDatosSession.decodeToken();
    if (tokenDecode) {
      this.user = tokenDecode;
      this.infoToken = await this.srvUser.actionInfoLogin().toPromise();
    }

    this.escucharEventos();
  }


  /**
   * Metodo que inicia la escuha de los eventos para el chat de la modelo o el usuario
   */
  escucharEventos() {
    this.elemento = document.getElementById('scrollchat');

    this.mensajesSubscription = this.chatService.getMessages(this.idSala).subscribe(msg => {
      console.log('recibi mensaje :  ', msg);
      this.mensajes.push(msg);

      setTimeout(() => {
        this.elemento.scrollTop = this.elemento.scrollHeight;
      }, 50);

    });
  }


  /**
   * Metodo que envia un mensaje socket para el canal de la modelo, este solo estara disponible para los
   * que esten en login
   */
  enviar() {
    if (this.user != null) {
      if (this.texto.trim().length > 0) {
        const payload = {
          envia: this.uso,
          de: this.user.username,
          room: this.idSala,
          cuerpo: this.texto
        };
        this.chatService.sendMessage(payload);
        this.texto = '';
      }
    }

  }

}
