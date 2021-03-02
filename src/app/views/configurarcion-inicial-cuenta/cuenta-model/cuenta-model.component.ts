import { DatosSessionService } from './../../../../admin-app/services/admin/seguridad/datos-session/datos-session.service';
import { Sweetalert2Service } from './../../../../admin-app/services/admin/sweetalert2/sweetalert2.service';
import { UserService } from './../../../../admin-app/services/general/user/user.service';
import { ParametrosApp } from './../../../../admin-app/services/admin/parameters-config/parametros-app';
import { JsonService } from './../../../../admin-app/services/general/json/json.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cuenta-model',
  templateUrl: './cuenta-model.component.html',
  styleUrls: ['./cuenta-model.component.scss']
})
export class CuentaModelComponent implements OnInit {
  @ViewChild(MatTabGroup) tabGroup: MatTabGroup;
  @ViewChild('miFileUpload_IMAGEN_PERFIL') miFileUpload_IMAGEN_PERFIL: any;
  @ViewChild('miFileUpload_IMAGEN_PORTADA') miFileUpload_IMAGEN_PORTADA: any;

  @ViewChild('miFileUpload_FOTO_FRONTAL_DOCUMENTO') miFileUpload_FOTO_FRONTAL_DOCUMENTO: any;
  @ViewChild('miFileUpload_FOTO_TRASERA_DOCUMENTO') miFileUpload_FOTO_TRASERA_DOCUMENTO: any;
  @ViewChild('miFileUpload_FOTO_SOTENIDA') miFileUpload_FOTO_SOTENIDA: any;

  parametrosRegistro = null;

  configUsuarioForm: FormGroup;
  personalesUsuarioForm: FormGroup;

  item = {
    fecha_inicio: null
  }

  nombreCarpetaPerfil = this.parametrosApp.nomCarpetaUpload.perfil;
  nombreCarpetaSolicitud = this.parametrosApp.nomCarpetaUpload.solicitud;

  user = null;
  infoToken = null;

  constructor(
    private router: Router,
    public parametrosApp: ParametrosApp,
    private fb: FormBuilder,
    private srvJson: JsonService,
    private srvUser: UserService,
    private srvMensajes: Sweetalert2Service,
    private srvDatosSession: DatosSessionService
  ) { }

  ngOnInit(): void {
    this.inicializarFormularios();
    this.consultarInformacion();
  }


  /**
   * Metodo para la configuracion inicial de los formularios
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

    this.personalesUsuarioForm = this.fb.group({
      nombres: new FormControl(null, [Validators.required]),
      apellidos: new FormControl(null, [Validators.required]),
      sexo: new FormControl(null, [Validators.required]),
      fechaNacimiento: new FormControl(null, [Validators.required]),
      identificacion: new FormControl(null, [Validators.required]),
    });
  }

  /**
   * Metodo para retornar controls de formulario configUsuarioForm para las validaciones del formulario
   */
  get f() { return this.configUsuarioForm.controls; }

  /**
   * Metodo para retornar controls de formulario personalesUsuarioForm para las validaciones del formulario
   */
  get fp() { return this.personalesUsuarioForm.controls; }


  /**
   * Metodo que consulta la información necesaria para este proceso
   */
  async consultarInformacion() {
    try {

      await this.validarPendiente();
      this.parametrosRegistro = await this.srvJson.actionDarParametrosRegistro({}).toPromise() as any;

      this.tabGroup.selectedIndex = 0;
    } catch (error) {

    }
  }


  /**
   * Metodo que valida si el usuario tiene la solicitud pendiente para realizar este proceso
   */
  async validarPendiente() {
    const tokenDecode = this.srvDatosSession.decodeToken();
    if (tokenDecode) {
      this.user = tokenDecode;
      this.infoToken = await this.srvUser.actionInfoLogin().toPromise();
    }
    if (!(this.user != null && this.infoToken != null && this.infoToken.estadoSolicitud == 'pendiente')) {
      this.router.navigate(['/']);
    }
  }

  /**
   * Metodo que se ejecuta cuando queremos cambiar de tab manualmente, valida que el formulario es valido para permitir avanzar
   * @param event evento que se genera al dar click sobre el tab
   */
  onTabChanged(event) {
    if (event.index == 1) {
      //console.log('xxxxx ', this.configUsuarioForm.getRawValue());
      const valido = this.configUsuarioForm.valid;
      if (valido && this.validarArchivos1()) {
        this.tabGroup.selectedIndex = 1;
      } else {
        this.tabGroup.selectedIndex = 0;
      }

    }

  }


  /**
   * Metodo que valida si los datos de preferencia fueron diligenciados
   * si lo fueron permite el paso al siguiente tab
   */
  pasarIdentificacion() {
    const valido = this.configUsuarioForm.valid;
    const validoArchivos = this.validarArchivos1()
    if (valido && validoArchivos) {
      this.tabGroup.selectedIndex = 1;
    } else {
      if (valido == false) {
        this.irArribaPagina();
      }
    }
  }


  /**
   * Metodo que valida si los archivos del tab 1 fueron cargados
   */
  validarArchivos1() {
    if (this.miFileUpload_IMAGEN_PERFIL.files.length > 0 && this.miFileUpload_IMAGEN_PORTADA.files.length) {
      return true;
    } else {
      return false;
    }
  }


  /**
   * Metodo que valida si los archivos del tab 2 fueron cargados
   */
  validarArchivos2() {
    if (this.miFileUpload_FOTO_FRONTAL_DOCUMENTO.files.length > 0
      && this.miFileUpload_FOTO_TRASERA_DOCUMENTO.files.length
      && this.miFileUpload_FOTO_SOTENIDA.files.length) {
      return true;
    } else {
      return false;
    }
  }


  /**
   * Metodo que agrupa los archivos cargados para darles un formato
   * y enviar al servidor para ser cargados
   */
  agruparArchivosSubir() {
    const lstArchivos = [];

    if (this.miFileUpload_IMAGEN_PERFIL != null &&
      this.miFileUpload_IMAGEN_PERFIL.files != null &&
      this.miFileUpload_IMAGEN_PERFIL.files.length > 0) {

      const archivoCargado = this.miFileUpload_IMAGEN_PERFIL.files[0];

      const name = `img_perfil`;

      const fielname = {
        carpeta: this.nombreCarpetaPerfil,
        nuevo_nombre: name,
        tipo: 'perfil'
      }

      const nFielname = btoa(JSON.stringify(fielname));

      const miArchivo = {
        descripcion: `${nFielname}`,
        archivo: archivoCargado
      }
      lstArchivos.push(miArchivo);
    }


    if (this.miFileUpload_IMAGEN_PORTADA != null &&
      this.miFileUpload_IMAGEN_PORTADA.files != null &&
      this.miFileUpload_IMAGEN_PORTADA.files.length > 0) {

      const archivoCargado = this.miFileUpload_IMAGEN_PORTADA.files[0];

      const name = `img_portada`;

      const fielname = {
        carpeta: this.nombreCarpetaPerfil,
        nuevo_nombre: name,
        tipo: 'portada'
      }

      const nFielname = btoa(JSON.stringify(fielname));

      const miArchivo = {
        descripcion: `${nFielname}`,
        archivo: archivoCargado
      }
      lstArchivos.push(miArchivo);
    }

    if (this.miFileUpload_FOTO_FRONTAL_DOCUMENTO != null &&
      this.miFileUpload_FOTO_FRONTAL_DOCUMENTO.files != null &&
      this.miFileUpload_FOTO_FRONTAL_DOCUMENTO.files.length > 0) {

      const archivoCargado = this.miFileUpload_FOTO_FRONTAL_DOCUMENTO.files[0];

      const name = `foto_frontal`;

      const fielname = {
        carpeta: this.nombreCarpetaSolicitud,
        nuevo_nombre: name
      }

      const nFielname = btoa(JSON.stringify(fielname));

      const miArchivo = {
        descripcion: `${nFielname}`,
        archivo: archivoCargado
      }
      lstArchivos.push(miArchivo);
    }

    if (this.miFileUpload_FOTO_TRASERA_DOCUMENTO != null &&
      this.miFileUpload_FOTO_TRASERA_DOCUMENTO.files != null &&
      this.miFileUpload_FOTO_TRASERA_DOCUMENTO.files.length > 0) {

      const archivoCargado = this.miFileUpload_FOTO_TRASERA_DOCUMENTO.files[0];

      const name = `foto_trasera`;

      const fielname = {
        carpeta: this.nombreCarpetaSolicitud,
        nuevo_nombre: name
      }

      const nFielname = btoa(JSON.stringify(fielname));

      const miArchivo = {
        descripcion: `${nFielname}`,
        archivo: archivoCargado
      }
      lstArchivos.push(miArchivo);
    }

    if (this.miFileUpload_FOTO_SOTENIDA != null &&
      this.miFileUpload_FOTO_SOTENIDA.files != null &&
      this.miFileUpload_FOTO_SOTENIDA.files.length > 0) {

      const archivoCargado = this.miFileUpload_FOTO_SOTENIDA.files[0];

      const name = `foto_sostenida`;

      const fielname = {
        carpeta: this.nombreCarpetaSolicitud,
        nuevo_nombre: name
      }

      const nFielname = btoa(JSON.stringify(fielname));

      const miArchivo = {
        descripcion: `${nFielname}`,
        archivo: archivoCargado
      }
      lstArchivos.push(miArchivo);
    }

    return lstArchivos;
  }


  /**
   * Metodo que valida que todos los datos necesarios fueron diligenciados y si lo fueron
   * pide una confirmación para realizar el guardado de la información
   */
  confirmarGuardado() {
    const validoTab1 = this.configUsuarioForm.valid;
    const validoTab1Archivos = this.validarArchivos1();

    const validoTab2 = this.personalesUsuarioForm.valid;
    const validoTab2Archivos = this.validarArchivos2();

    if (validoTab1 && validoTab1Archivos && validoTab2 && validoTab2Archivos) {
      this.srvMensajes.mensajeConfimacion('Confirmar',
        '¿Confirma que la información es correcta?', 'q').then(res => {
          if (res) {
            this.guardar();
          }
        })
    } else {

      if (validoTab2 == false) {
        this.irArribaPagina();
      }

    }
  }


  /**
   * Metodo que si ocurre un error nos envia al inicio de la pagina para que revise el formulario
   */
  irArribaPagina() {
    setTimeout(() => {
      window.scrollTo({
        top: 50,
        left: 0,
        behavior: 'smooth'
      });
    }, 200)
  }


  /**
   * Metodo que envia una peticion al servidor para guardar la información
   */
  async guardar() {

    try {
      this.srvMensajes.procesando();
      const lstArchivos = this.agruparArchivosSubir();

      const datosConfig = this.configUsuarioForm.getRawValue();
      const datosPErsonales = this.personalesUsuarioForm.getRawValue();

      const dataEnviar = {
        usuario: Object.assign(datosConfig, datosPErsonales)
      }

      const respuesta = await this.srvUser.actionGuardarSolicitud(dataEnviar, lstArchivos).toPromise() as any;

      this.srvMensajes.enviarMensajeFuncion(null, 'Se ha guardado la información, en un plazo maximo de 24 horas recibira respuesta para su activación', 's', () => {
        this.router.navigate(['/']);
      });
    } catch (error) {
      this.srvMensajes.mensajeErrorServidor(error);
    }

  }

}
