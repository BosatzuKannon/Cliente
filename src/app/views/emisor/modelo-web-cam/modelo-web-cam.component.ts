import { DatosSessionService } from './../../../../admin-app/services/admin/seguridad/datos-session/datos-session.service';
import { UserService } from './../../../../admin-app/services/general/user/user.service';
import { WebsocketService } from './../../../../admin-app/services/general/websocket/websocket.service';
import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-modelo-web-cam',
  templateUrl: './modelo-web-cam.component.html',
  styleUrls: ['./modelo-web-cam.component.scss']
})
export class ModeloWebCamComponent implements OnInit {

  @ViewChild('video', { static: true }) videoElement: ElementRef;
  @ViewChild('canvas', { static: true }) canvas: ElementRef;

  videosrc: string;

  configGlobalVideo = null;

  transmitiendo = false;
  interval = null;

  sockid = '';
  user = null;
  idSala = null;

  constructor(
    private renderer: Renderer2,
    private srvWebsocket: WebsocketService,
    private srvUser: UserService,
    private srvDatosSession: DatosSessionService,
  ) {

  }

  ngOnInit(): void {
    this.iniciarVariables();
    this.consultarInformacion();
  }


  /**
   * Metodo para iniciar variables cuando inicie el componente
   */
  iniciarVariables() {
    this.configGlobalVideo = {
      video: {
        facingMode: 'environment',
        width: { ideal: 200 },
        height: { ideal: 200 }
      },
      audio: false
    };
  }


  /**
   * Metodo que realiza el login y consulta la información del token
   */
  async consultarInformacion() {
    const token = this.srvDatosSession.getToken();
    if (token != null) {
      await this.srvWebsocket.loginWS(token);
    }

    this.user = await this.srvUser.actionInfoToken().toPromise();
    this.idSala = this.user.username;
  }


  /**
   * Metodo que ejecuta las funciones para inciar la camara
   */
  start() {
    this.iniciarVariables();
    this.initCamera(this.configGlobalVideo);
  }


  /**
   * Metodo que cambia la configuracion para que se active el sonido
   */
  sound() {
    this.configGlobalVideo.audio = !this.configGlobalVideo.audio;
    this.initCamera(this.configGlobalVideo);
  }


  /**
   * Metodo que obtiene los usermedia del disposivo y lo inicia
   * @param config confiruraciones que va a permitir el dispositivo
   */
  initCamera(config) {

    if (!!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
      navigator.mediaDevices.getUserMedia(config)
        .then((mediaStream) => {
          this.attachVideo(mediaStream)
        })
        .catch((error) => {
          this.handleError(error);
        });
    } else {
      alert('Lo sentimos, la camara no esta disponible.');
    }
  }


  /**
   * Metodo que setea una url para incrustar el stream
   * @param stream stream a renderizar
   */
  attachVideo(stream) {
    this.renderer.setProperty(this.videoElement.nativeElement, 'srcObject', stream);
  }


  /**
   * Metodo para controlar el error
   * @param error error que se causo al tratar de utilizar la camara
   */
  handleError(error) {
    console.log('Error: ', error);
  }


  /**
   * Metodo que captura la información del canvas y lo emite por el socket
   */
  drawRectable() {
    const canvas = this.canvas.nativeElement;
    if (canvas.getContext) {
      const ctx = canvas.getContext('2d');
      if (this.transmitiendo) {
        ctx.drawImage(this.videoElement.nativeElement, 0, 0);

        const data = {
          room: this.idSala,
          video: canvas.toDataURL('image/webp')
          // video: canvas
        }
        this.srvWebsocket.emitirTodos(data);

      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  }


  /**
   * Metodo ejecuta las funciones necesarias para empezar a emitir
   */
  emitir() {
    this.transmitiendo = !this.transmitiendo;
    if (this.transmitiendo) {
      this.interval = setInterval(() => {
        this.drawRectable();
      }, 50);
    } else {
      clearInterval(this.interval);
      this.drawRectable();
    }

  }

}
