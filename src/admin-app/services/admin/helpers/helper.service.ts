import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {


  formatFormulario(formulario) {


    let nData = {};
    for (const i in formulario.value) {
      const llave = i;
      let valor = formulario.controls[llave].value;

      if(!valor){
        valor = null;
      }

      nData[llave] = valor;
    }
    return nData;
  }


  setearDatosFormReactivo(form, data) {
    debugger
    // tslint:disable-next-line: forin
    for (const i in form.controls) {
      const llave = i;

      for (let item in data) {
        if (item == llave) {
          const value = data[item];

          // form.controls[llave].setValue(value);
          form.controls[llave].patchValue(value);

          break;
        }
      }
    }
  }


  /**
   *
   * @param fechaparam fecha a procesar
   * @param opciones opciones para el formato de fechas
   * @example { hora: false, separador: '/', anioPrimero: false }
   */
  formatearFecha(fechaparam, opciones = null) {
    if (fechaparam) {
      const fecha = new Date(fechaparam);

      const separador = opciones != null && opciones.separador != null ? opciones.separador : '/';
      const hora = opciones != null && opciones.hora != null ? opciones.hora : false;
      const anioPrimero = opciones != null && opciones.anioPrimero != null ? opciones.anioPrimero : false;

      let cadena = ''

      const mes = this.padnum(fecha.getMonth() + 1, 2);
      const dia = this.padnum(fecha.getDate(), 2);
      const hora_formateada = this.padnum(fecha.getHours(), 2);
      const minuto = this.padnum(fecha.getMinutes(), 2);

      if (anioPrimero) {
        cadena = [fecha.getFullYear(), mes, dia].join(separador);
      } else {
        cadena = [dia, mes, fecha.getFullYear()].join(separador);
      }

      if (hora) {
        cadena = cadena + ' ' + hora_formateada + ':' + minuto;
      }


      return cadena;
    }
    else {
      return null;
    }
  }

  padnum(num, size) {
    let s = num + '';
    while (s.length < size) {
      s = '0' + s
    }
    return s;
  }
}
