import { WebsocketService } from './../websocket/websocket.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    public srvWebsocket: WebsocketService
  ) { }

  /**
   * Metodo encargado de emitir un evento socket para el envio de mensajes
   * @param payload informacion del mensaje y el socket
   */
  sendMessage(payload) {
    this.srvWebsocket.emit('mensaje', payload);

  }


  /**
   * Metodo encargado de la escucha de los mensajes emitidos por el canal de la modelo
   * @param sala sala en la que se estan emitiendo los chats
   */
  getMessages(sala) {
    return this.srvWebsocket.listen('mensajes' + sala);
  }


  /**
   * Metodo encargado de la escucha del video emitidos por el canal de la modelo
   * @param sala sala o parametrica por donde se esta recibiendo el video
   */
  getVideo(sala) {
    return this.srvWebsocket.listen(sala);
  }


  /**
   * Metodo encargado de la escucha de los usuarios conectados
   */
  getUser() {
    return this.srvWebsocket.listen('update-user-list');
  }


  /**
   * Metodo encargado de la escucha de los usuarios que iniciaron sesion
   */
  getUserConfig() {
    return this.srvWebsocket.listen('update-user-config');
  }


  /**
   *  Metodo encargado de la escucha de los usuarios cerraron las pestañas del navegador
   */
  getUserRemove() {
    return this.srvWebsocket.listen('remove-user');
  }


}
