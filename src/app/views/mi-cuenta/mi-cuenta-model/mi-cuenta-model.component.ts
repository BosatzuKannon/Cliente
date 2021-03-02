import { HelperService } from './../../../../admin-app/services/admin/helpers/helper.service';
import { DatosSessionService } from './../../../../admin-app/services/admin/seguridad/datos-session/datos-session.service';
import { Sweetalert2Service } from './../../../../admin-app/services/admin/sweetalert2/sweetalert2.service';
import { UserService } from './../../../../admin-app/services/general/user/user.service';
import { JsonService } from './../../../../admin-app/services/general/json/json.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ParametrosApp } from './../../../../admin-app/services/admin/parameters-config/parametros-app';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
import { find } from 'rxjs/operators';


@Component({
  selector: 'app-mi-cuenta-model',
  templateUrl: './mi-cuenta-model.component.html',
  styleUrls: ['./mi-cuenta-model.component.scss']
})
export class MiCuentaModelComponent implements OnInit {
  @ViewChild('miFileUpload_IMAGEN_GALERIA') miFileUpload_IMAGEN_GALERIA: any;

  parametrosRegistro = null;

  configUsuarioForm: FormGroup;

  item = {
    fecha_inicio: null
  }

  nombreCarpetaPerfil = this.parametrosApp.nomCarpetaUpload.perfil;
  nombreCarpetaSolicitud = this.parametrosApp.nomCarpetaUpload.solicitud;
  nombreCarpetaGaleria = this.parametrosApp.nomCarpetaUpload.galeria;

  infoUser = null;

  lstImagenes = [];

  galeria = [];

  constructor(
    protected sanitizer: DomSanitizer,
    private router: Router,
    public parametrosApp: ParametrosApp,
    private fb: FormBuilder,
    private srvJson: JsonService,
    private srvUser: UserService,
    private srvMensajes: Sweetalert2Service,
    private srvHelper: HelperService
  ) { }

  ngOnInit(): void {
    this.inicializarFormularios();
    this.consultarInformacion();
  }

  /**
   * Metodo que inicializa los valores iniciales de los formularios para las preferencias
   */
  inicializarFormularios() {
    this.configUsuarioForm = this.fb.group({
      meinteresa: new FormControl(null, [Validators.required]),
      tipoCuerpo: new FormControl(null, [Validators.required]),
      etnia: new FormControl(null, [Validators.required]),
      colorCabello: new FormControl(null),
      colorOjos: new FormControl(null),
      subCultura: new FormControl(null),
      acercaDeMi: new FormControl(null),
    });


  }


  /**
   * Retorna los valores del formulario para validar los errores
   */
  get f() { return this.configUsuarioForm.controls; }


  /**
   * Metodo que consulta la información de de las preferencias de la modelo
   */
  async consultarInformacion() {
    try {
      this.parametrosRegistro = await this.srvJson.actionDarParametrosRegistro({}).toPromise() as any;
      this.infoUser = await this.srvUser.actionInfoLogin().toPromise() as any;
      this.galeria = this.formatGaleria(this.infoUser.galeria);
      this.configUsuarioForm.patchValue(this.infoUser);

    } catch (error) {
      this.srvMensajes.mensajeErrorServidor(error);
    }
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
      const nitem = item + '?timespan=' + timespan.getTime();
      nlstImagenes.push(nitem);
    }
    return nlstImagenes;
  }


  /**
   * Metodo que envia la peticion al servidor para guardar las preferencias seleccionadas
   */
  async guardarPreferencias() {
    try {
      this.srvMensajes.procesando();
      const datosConfig = this.srvHelper.formatFormulario(this.configUsuarioForm);

      const dataEnviar = {
        preferencias: datosConfig
      }

      const respuesta = await this.srvUser.actionGuardarPreferencias(dataEnviar).toPromise() as any;
      this.configUsuarioForm.patchValue(respuesta.user);
      this.srvMensajes.enviarMensaje(null, null, 's');

    } catch (error) {
      this.srvMensajes.mensajeErrorServidor(error);
    }
  }

  /**
   * Metodo formatea la url para poder ser visualizada
   * @param ruta url de la imagen
   */
  urlModificada(ruta) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(ruta);
  }


  /**
   * Metodo que envia una peticion al servidor para que guarde las imagenes
   */
  async guardarImagenes() {
    try {
      this.srvMensajes.procesando();
      const lstArchivos = this.formatImagenes();

      const dataEnviar = {

      }

      const respuesta = await this.srvUser.actionGuardarImagenes(dataEnviar, lstArchivos).toPromise() as any;
      this.galeria = this.formatGaleria(respuesta.galeria);
      this.srvMensajes.enviarMensaje(null, 'Las imagenes fueron cargadas', 's');
      this.miFileUpload_IMAGEN_GALERIA.clear();
    } catch (error) {
      this.miFileUpload_IMAGEN_GALERIA.clear();
      this.srvMensajes.mensajeErrorServidor(error);
    }
  }


  /**
   * Metodo que da formato a las imagenes cardagas y poderlas identificar en el servidor
   */
  formatImagenes() {
    const lstCargados = this.miFileUpload_IMAGEN_GALERIA.files;
    const lstArchivos = [];

    for (const item of lstCargados) {

      const fielname = {
        carpeta: this.nombreCarpetaGaleria,
        nuevo_nombre: null
      }

      const nFielname = btoa(JSON.stringify(fielname));

      const miArchivo = {
        descripcion: `${nFielname}`,
        archivo: item
      }
      lstArchivos.push(miArchivo);
    }

    return lstArchivos;
  }


  /**
   * Metodo que elimina la imagen del array que se visualiza en fileUpload
   * @param file archivo referenciado
   */
  quitarFotoLista(file) {
    const miIndex = this.miFileUpload_IMAGEN_GALERIA.files.findIndex(mif => mif === file);
    if (miIndex > -1) {
      this.miFileUpload_IMAGEN_GALERIA.files.splice(miIndex, 1);
    }
  }


  /**
   * Metodo que pide confirmación al momento de eliminar una foto que ya ha sido guardada en nuestra base de datos
   * @param item objeto de la lista
   */
  confirmarEliminarImagen(item) {
    this.srvMensajes.mensajeConfimacion('Confirmar eliminación', 'Este proceso eliminara esta imagen de su galeria. <br><br> ¿Confirma que desea continuar?', 'q').then(res => {
      if (res) {
        this.eliminarImagen(item);
      }
    })
  }


  /**
   * Metodo que envia una petición al servidor para eliminar la imagen seleccionada
   * @param item objeto a eliminar
   */
  async eliminarImagen(item) {
    try {
      this.srvMensajes.procesando();
      let nomImagen = item;
      nomImagen = nomImagen.split('?')[0];
      const dataEnviar = {
        imagen: nomImagen
      }

      const respuesta = await this.srvUser.actionEliminarImagen(dataEnviar).toPromise() as any;
      this.galeria = this.formatGaleria(respuesta.galeria);
      this.srvMensajes.enviarMensaje(null, 'Las imagen fue eliminada', 's');

    } catch (error) {
      this.srvMensajes.mensajeErrorServidor(error);
    }
  }


}
