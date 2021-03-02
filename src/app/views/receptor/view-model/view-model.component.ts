import { ParametrosApp } from './../../../../admin-app/services/admin/parameters-config/parametros-app';
import { UserService } from './../../../../admin-app/services/general/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatService } from './../../../../admin-app/services/general/chat/chat.service';
import { WebsocketService } from './../../../../admin-app/services/general/websocket/websocket.service';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-view-model',
  templateUrl: './view-model.component.html',
  styleUrls: ['./view-model.component.scss']
})
export class ViewModelComponent implements OnInit {
  @ViewChild('miVideo') miVideo: any;

  videoSubscription = null;

  idSala = null;

  galeria = [];

  /**
   * Opciones de responsiva para el carrusel
   */
  responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 3
    },
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 2
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1
    }
  ];

  constructor(
    public parametrosApp: ParametrosApp,
    public actRoute: ActivatedRoute,
    public router: Router,
    private chatService: ChatService,
    private srvUser: UserService
  ) {
    this.idSala = this.actRoute.snapshot.paramMap.get('sala');
  }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    this.consultarInformacion();
  }


  /**
   * Metodo que consulta la información de la modelo a ver
   */
  async consultarInformacion() {
    const dataEnviar = {
      username: this.idSala
    }
    const data = await this.srvUser.actionConsultarGaleria(dataEnviar).toPromise() as any;
    const galeriaTemp = data.galeria != null ? data.galeria : [];
    this.galeria = this.formatGaleria(galeriaTemp);
    this.iniciarEscucha();
  }


  /**
   * Metodo que inicia la escucha de los eventos socket
   */
  iniciarEscucha() {

    this.videoSubscription = this.chatService.getVideo(this.idSala).subscribe(img => {
      // this.miVideo.nativeElement.source = img;
      this.drawRectable(img);
    });
  }

  /**
   * Metodo que da formato a la galeria para poder visualizar se le coloca el
   * timespan para que las imagenes no se queden en cache
   * @param lstImagenes lst de imagenes guardadas en la galeria
   */
  formatGaleria(lstImagenes) {
    const timespan = new Date();
    const nlstImagenes = [];
    for (const item of lstImagenes) {
      const nitem = this.parametrosApp.ApiUrl + '/' + item + '?timespan=' + timespan.getTime();
      nlstImagenes.push(nitem);
    }
    return nlstImagenes;
  }


  /**
   * Metodo que pinta lo que viene del socket
   * @param img informacion enviada
   */
  drawRectable(img) {
    const imagen = document.getElementById('imagen') as any;
    imagen.src = img;
  }

}
