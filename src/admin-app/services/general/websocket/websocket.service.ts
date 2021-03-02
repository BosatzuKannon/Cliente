import { DatosSessionService } from './../../admin/seguridad/datos-session/datos-session.service';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  estadoSocket = false;

  constructor(
    private socket: Socket,
    private srvDatosSession: DatosSessionService,
  ) { }


  /**
   * Metodo que verifica si el socket esta funcionando
   */
  checkStatus() {
    this.socket.on('connect', () => {

      // const token = this.srvDatosSession.getToken();
      // if (token != null) {
      //   this.loginWS(token);
      // }

      console.log('Conectado');
      this.estadoSocket = true;
    });

    this.socket.on('disconnect', () => {
      console.log('Desconectado');
      this.estadoSocket = false;
    });
  }


  /**
   * Metodo que emite un evento socket
   * @param evento Nombre del evento a emitir
   * @param payload Data que se envia
   * @param callback MEtodo que se ejecutara
   */
  emit(evento: string, payload?: any, callback?: Function) {
    this.socket.emit(evento, payload, callback);
  }


  /**
   * Metodo que escucha un evento socket
   * @param evento nombre del evento a escuchar
   */
  listen(evento: string) {
    return this.socket.fromEvent(evento);
  }


  /**
   * Metodo que envia un evento socket para configurar el usuario socket, se identifica el socket y se le setea el token
   * @param token token del login del api
   */
  loginWS(token: string) {
    return new Promise((resolve, reject) => {
      this.emit('configurar-usuario', { token }, resp => {
        resolve(resp);
      });

    });
  }


  // emitirVideo(offer, socketId) {
  //   this.socket.emit("call-user", {
  //     offer,
  //     to: socketId
  //   });
  // }


  /**
   * Metodo que envia un evento socket con el video
   * @param data  se establece un json con { room: 'canaldondetrasmite', video: 'datadelvideo'}
   */
  emitirTodos(data) {
    this.socket.emit('stream', data);
  }

}
