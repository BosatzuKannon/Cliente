import { ParametrosApp } from './../../../admin-app/services/admin/parameters-config/parametros-app';
import { Sweetalert2Service } from './../../../admin-app/services/admin/sweetalert2/sweetalert2.service';
import { HelperService } from './../../../admin-app/services/admin/helpers/helper.service';
import { UserService } from './../../../admin-app/services/general/user/user.service';
import { FormGroup, FormBuilder, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PlatformLocation } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro-cuenta',
  templateUrl: './registro-cuenta.component.html',
  styleUrls: ['./registro-cuenta.component.scss']
})
export class RegistroCuentaComponent implements OnInit {
  tituloCard = '';
  tituloBtnCrear = '';

  usuarioForm: FormGroup;
  imagen = '';

  urlorigen = '';

  tiposUsuario = this.parametrosApp.tiposUsuario;

  constructor(
    private parametrosApp: ParametrosApp,
    platformLocation: PlatformLocation,
    private router: Router,
    private fb: FormBuilder,
    private cdRef: ChangeDetectorRef,
    private srvUser: UserService,
    private srvHelper: HelperService,
    private srvMensaje: Sweetalert2Service
  ) {
    this.urlorigen = (platformLocation as any).location.origin;


  }

  ngOnInit(): void {
    this.usuarioForm = this.fb.group({
      username: new FormControl(null, [Validators.required]),
      correo: new FormControl(null, [Validators.required]),
      tipoUser: new FormControl(this.tiposUsuario.default, [Validators.required]),
    });
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  ngAfterViewInit() {
    this.verImagen();
  }


  /**
   * Metodo que da la imagen y el titulo de forma dinamica segun el tipo de usuario seleccionado
   */
  verImagen() {

    let imagenTemp = 'imgRgUsuario';
    this.tituloCard = 'Crear cuenta gratis';
    this.tituloBtnCrear = 'Hazte una cuenta gratis';

    if (this.usuarioForm.get('tipoUser').value == this.tiposUsuario.esEstudio) {
      imagenTemp = 'imgRgEstudio';
      this.tituloCard = 'Crea tu cuenta de estudio';
      this.tituloBtnCrear = 'Crear cuenta';

    } else if (this.usuarioForm.get('tipoUser').value == this.tiposUsuario.esChica) {
      imagenTemp = 'imgRgModelo';
      this.tituloCard = 'Crea una cuenta de modelo y gana dinero';
      this.tituloBtnCrear = 'Quiero ganar dinero';
    }
    this.imagen = imagenTemp;
  }


  /**
   * Metodo para retornar controls de formulario usuarioForm para las validaciones del formulario
   */
  get f() { return this.usuarioForm.controls; }


  /**
   * Metodo que envia una peticion al servidor para registrar el usuario
   * @param formDirective directiva del formulario para realizar el reset del formulario
   */
  async registar(formDirective: FormGroupDirective) {

    try {
      const estado = this.usuarioForm.valid;
      if (estado) {
        this.srvMensaje.procesando('Creando cuenta');
        const form = this.srvHelper.formatFormulario(this.usuarioForm) as any;
        const dataEnviar = {
          origen: this.urlorigen,
          usuario: form
        }

        const mensaje = form.tipoUser == this.tiposUsuario.default ? 'para disfrutar del mejor contenido online para adultos.' : 'para continuar con el proceso de registro.'

        const respuesta = await this.srvUser.actionRegistrarEnviarEmail(dataEnviar).toPromise() as any;
        this.srvMensaje.enviarMensaje('Cuenta creada', `Hemos enviado tu clave de acceso para la cuenta <strong>${form.username}</strong> al correo electronico <strong>${form.correo}</strong>, activa tu cuenta ${mensaje}`, 's');
        this.usuarioForm.reset();
        formDirective.resetForm();
        this.usuarioForm.get('tipoUser').setValue(form.tipoUser);

        // this.ngOnInit();
        // const dataLogin = {
        //   user: {
        //     username: form.username,
        //     password: respuesta.codVerificacion
        //   }
        // }
        // const respuestaLogin = await this.srvUser.actionLogin(dataLogin);

        // if (respuestaLogin.estado !== 'ok') {
        //   this.srvMensaje.enviarMensaje(respuesta.titulo, respuesta.mensaje, 'w');
        // } else {

        //   if (form.tipoUser == this.tiposUsuario.esChica) {
        //     this.router.navigate(['config-account', 'model']);
        //   }
        //   else if (form.tipoUser == this.tiposUsuario.esEstudio) {

        //   } else {
        //     this.router.navigate(['/']);
        //   }
        //   this.srvMensaje.cerrarMensaje();
        // }
      }

    } catch (error) {
      this.srvMensaje.mensajeErrorServidor(error);
    }


  }

}
