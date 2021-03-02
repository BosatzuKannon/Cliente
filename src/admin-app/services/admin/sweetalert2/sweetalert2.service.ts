import { Injectable } from '@angular/core';

import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class Sweetalert2Service {

  private getCustomClass() {
    const retorno = {
      popup: 'swal2-popup-custom',
      title: 'swal2-title-custom',
      content: 'swal2-content-custom',
    }
    return retorno;
  }

  private getCustomClassPreloader() {
    const retorno = {
      popup: 'swal2-popup-preloader',
      title: 'swal2-title-preloader',
      content: 'swal2-content-preloader',
    }
    return retorno;
  }

  private getBackdropCustom() {
    return `rgb(0 0 0 / 0.20)`;
  }

  private getBackdropPreloader() {
    return `rgb(0 0 0 / 0.20)`;
  }

  private getAnimationShowClass() {
    return 'animate__animated animate__fadeInDown animate__faster';
  }

  private getAnimationHideClass() {
    return 'animate__animated animate__fadeOutUp animate__faster';
  }

  /**
   * Titulo del mensaje general de los mensajes de error
   */
  getTextTituloMsjError() {
    return 'ERROR AL PROCESAR LA SOLICITUD';
  }

  /**
   * Mensaje general de los mensajes de error
   */
  getTextMsjError() {
    return 'Ha ocurrido un error inesperado, por favor intente nuevamente o comuniquese con el administrador';
  }

  /**
   * Obtener el tipo y el titulo del mensaje para sweetalert2
   * @param pTipo tipo del mensaje
   */
  private darTiposMensaje(pTipo) {

    let titulo = 'ERROR';
    let tipo = 'error';
    let mensajeTemp = '';

    if (pTipo != null && pTipo != '') {
      let miTipo = pTipo.toLowerCase();
      if (miTipo == 's' || miTipo == 'success') {
        titulo = 'ÉXITO';
        tipo = 'success';
        mensajeTemp = 'PROCESO EXITOSO';

      } else if (miTipo == 'w' || miTipo == 'warning') {
        titulo = 'ADVERTENCIA';
        tipo = 'warning';
        mensajeTemp = 'ADVERTENCIA';
      } else if (miTipo == 'e' || miTipo == 'error') {
        titulo = 'ERROR';
        tipo = 'error';
        mensajeTemp = 'ERROR';
      } else if (miTipo == 'i' || miTipo == 'info') {
        titulo = 'INFORMACIÓN';
        tipo = 'info';
        mensajeTemp = 'INFORMACIÓN';
      } else if (miTipo == 'q' || miTipo == 'question') {
        titulo = 'PREGUNTA';
        tipo = 'question';
        mensajeTemp = 'PREGUNTA';
      }
    }

    let mensaje = {
      titulo: titulo,
      tipo: tipo,
      mensaje: mensajeTemp.toUpperCase()
    }

    return mensaje;
  }


  /**
   * Metodo que genera un preloader de sweetalert2
   * @param title Titulo del preloader se establece como procesando por defecto
   * Si envia la cadena 'CI' el title se sobreescribe con el valor contenido en el metodo getTxtConInf()
   * @param allowOutsideClick
   */
  procesando(title = this.getTxtProcesando(), allowOutsideClick = false) {

    if (title == 'CI') {
      title = this.getTxtConInf();
    }

    Swal.fire({
      // imageUrl: `./assets/img/preloader.svg`,
      title: title.toUpperCase(),
      html: `
      Por favor espere un momento mientras procesamos su solicitud.`,
      allowOutsideClick: allowOutsideClick,
      showConfirmButton: false,
      backdrop: this.getBackdropPreloader(),
      customClass: this.getCustomClassPreloader(),
      showClass: {
        popup: this.getAnimationShowClass()
      },
      hideClass: {
        popup: this.getAnimationHideClass()
      },
      onOpen: () => {
        Swal.showLoading()
      }
    });

    // Swal.fire({
    //   title: title.toUpperCase(),
    //   html: 'Por favor espere un momento mientras procesamos su solicitud.',
    //   allowOutsideClick: allowOutsideClick,
    //   backdrop: this.getBackdropCustom(),
    //   customClass: this.getCustomClass(),
    //   onOpen: () => {
    //     Swal.showLoading()
    //   }
    // })
  }

  cerrarMensaje() {
    Swal.close();
  }


  /**
   * Metodo general de envio de mensajes
   * @param pTitulo Titulo del alert
   * @param pText Cuerpo del alert
   * @param pTipo Tipo de alert
   * @param allowOutsideClick Si desea que se cierre haciendo clic en cuaquier lado de la pantalla
   * @param time tiempo de retardo en mostrar el mensaje
   */
  enviarMensaje(pTitulo, pText, pTipo, allowOutsideClick = false, time = 250) {
    let rTipoMensaje = <any>this.darTiposMensaje(pTipo);
    setTimeout(() => {
      Swal.fire({
        customClass: this.getCustomClass(),
        backdrop: this.getBackdropCustom(),
        title: pTitulo != null && pTitulo != '' ? pTitulo.toUpperCase() : rTipoMensaje.mensaje,
        html: pText,
        icon: rTipoMensaje.tipo,
        allowOutsideClick: allowOutsideClick,
        showClass: {
          popup: this.getAnimationShowClass()
        },
        hideClass: {
          popup: this.getAnimationHideClass()
        }
      })
    }, time);
  }

  enviarMensajeFuncion(pTitulo, pText, pTipo, funcionEvento, allowOutsideClick = false, time = 250,) {
    let rTipoMensaje = <any>this.darTiposMensaje(pTipo);
    setTimeout(() => {
      Swal.fire({
        customClass: this.getCustomClass(),
        backdrop: this.getBackdropCustom(),
        title: pTitulo != null && pTitulo != '' ? pTitulo.toUpperCase() : rTipoMensaje.mensaje,
        html: pText,
        icon: rTipoMensaje.tipo,
        allowOutsideClick: allowOutsideClick,
        showClass: {
          popup: this.getAnimationShowClass()
        },
        hideClass: {
          popup: this.getAnimationHideClass()
        }
      }).then(function () {
        funcionEvento();
      })
    }, time);
  }


  enviarMensajeFuncionClick(pTitulo, pText, pTipo, funcionEvento, allowOutsideClick = false, time = 250,) {
    let rTipoMensaje = <any>this.darTiposMensaje(pTipo);
    setTimeout(() => {
      Swal.fire({
        customClass: this.getCustomClass(),
        backdrop: this.getBackdropCustom(),
        title: pTitulo != null && pTitulo != '' ? pTitulo.toUpperCase() : rTipoMensaje.mensaje,
        html: pText,
        icon: rTipoMensaje.tipo,
        allowOutsideClick: allowOutsideClick,
        showClass: {
          popup: this.getAnimationShowClass()
        },
        hideClass: {
          popup: this.getAnimationHideClass()
        }
      }).then((result) => {
        if (result.value) {
          funcionEvento()
        }
      })
    }, time);
  }

  enviarMensajeFuncionClickPromesa(pTitulo, pText, pTipo, showCancelButton = false, allowOutsideClick = false) {
    var self = this;

    return new Promise((resolve, reject) => {
      let rTipoMensaje = <any>self.darTiposMensaje(pTipo);
      Swal.fire({
        customClass: this.getCustomClass(),
        backdrop: this.getBackdropCustom(),
        title: pTitulo != null && pTitulo != '' ? pTitulo.toUpperCase() : rTipoMensaje.mensajeTemp,
        html: pText,
        icon: rTipoMensaje.tipo,
        allowOutsideClick: allowOutsideClick,
        showCancelButton: showCancelButton,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Confirmar',
        showClass: {
          popup: this.getAnimationShowClass()
        },
        hideClass: {
          popup: this.getAnimationHideClass()
        }
      }).then(result => {
        resolve(result.value);
      });

    });
  }


  /**
   * Metodo que renderiza mensajes de error enviados desde el servidor
   * @param error JSON en formato { 'error': 'Mi error' }
   * @param time tiempo de retardo en mostrar el mensaje
   */
  mensajeErrorServidor(error, time = 250) {

    let titulo = this.getTextTituloMsjError();
    let message = this.getTextMsjError();

    let tipo = null;

    if (error != null && error.error != null) {

      let errorValor = error.error;
      if (errorValor.title != null && errorValor.title != '') {
        titulo = errorValor.title;
      }

      if (errorValor.message != null && errorValor.message != '') {
        tipo = typeof (errorValor.message);
        message = errorValor.message
      }
    } else if (error.title != null || error.message != null) {
      if (error.title != null && error.title != '') {
        titulo = error.title;
      }
      if (error.message != null && error.message != '') {
        message = error.message
      }

    }


    // if (tipo == null && error != null && error.message != null && error.name != null) {
    // 	message = error.message;
    // 	titulo = error.name;
    // }


    setTimeout(() => {
      this.enviarMensaje(titulo.toUpperCase(), message, 'e');
    }, time);
  }


  /**
   * Metodo que renderiza mensajes enviados desde el servidor que no sean errores
   * @param data se recibe un JSON { msj:{titulo:'Mi titulo', mensaje:'Mi mensaje'} }
   * @param pTipo se recibe el tipo de alert
   * @param time tiempo de retardo en mostrar el mensaje
   */
  mensajeServidor(data, pTipo, time = 250) {

    let titulo = '';
    let message = '';

    let tipoMensaje = <any>this.darTiposMensaje(pTipo);

    if (data != null && data.msj != null) {
      let dataMensaje = data.msj;
      if (dataMensaje.title != null && dataMensaje.title != '') {
        titulo = dataMensaje.title;
      }

      if (dataMensaje.message != null && dataMensaje.message != '') {
        message = dataMensaje.message
      }
    }

    setTimeout(() => {
      Swal.fire({
        customClass: this.getCustomClass(),
        backdrop: this.getBackdropCustom(),
        title: titulo.toUpperCase(),
        html: message,
        icon: tipoMensaje.tipo,
        showClass: {
          popup: this.getAnimationShowClass()
        },
        hideClass: {
          popup: this.getAnimationHideClass()
        }
      })
    }, time);
  }


  mensajeInput(titulo, mensajeplace, tipoinput, valordefault) {
    return new Promise((resolve, reject) => {

      Swal.fire({
        customClass: this.getCustomClass(),
        backdrop: this.getBackdropCustom(),
        title: titulo,
        input: tipoinput,
        inputValue: valordefault,
        inputPlaceholder: mensajeplace,
        showCancelButton: true,
        icon: "info",
        allowOutsideClick: false,
        allowEscapeKey: false
      }).then(function (resultado) {
        if (resultado.value) {
          resolve(resultado.value);
        }
      }).catch(function (error) {
        reject(error);
      });

    });

  }


  mensajeConfimacion(pTitulo, pText, pTipo, allowOutsideClick = false, time = 250,) {

    var self = this;

    if (pTitulo == 'CS') {
      pTitulo = '¿CONFIRMA QUE DESEA GUARDAR?';
    } else if (pTitulo == 'CU') {
      pTitulo = '¿CONFIRMA QUE DESEA ACTUALIZAR?';
    } else if (pTitulo == 'CD') {
      pTitulo = '¿CONFIRMA QUE DESEA ELIMINAR?';
    }

    return new Promise((resolve, reject) => {
      let rTipoMensaje = <any>self.darTiposMensaje(pTipo);
      Swal.fire({
        customClass: this.getCustomClass(),
        backdrop: this.getBackdropCustom(),
        title: pTitulo != null && pTitulo != '' ? pTitulo.toUpperCase() : rTipoMensaje.mensajeTemp,
        html: pText,
        icon: rTipoMensaje.tipo,
        allowOutsideClick: allowOutsideClick,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Confirmar',
        showClass: {
          popup: this.getAnimationShowClass()
        },
        hideClass: {
          popup: this.getAnimationHideClass()
        }
      }).then(result => {
        resolve(result.value);
      });

    });
  }

  private getTxtConInf() {
    return 'CONSULTANDO INFORMACIÓN';
  }

  private getTxtProcesando() {
    return 'PROCESANDO';
  }

}
