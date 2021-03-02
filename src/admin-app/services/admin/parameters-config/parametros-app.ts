import { Injectable } from '@angular/core';
import config from './miConfigApp';

@Injectable({
  providedIn: 'root'
})
export class ParametrosApp {
  nomToken = config.nomToken;
  ApiUrl = config.ApiUrl;
  petUrl = config.petUrl;

  tiposUsuario = {
    default: 'default',
    esChica: 'esChica',
    esEstudio: 'esEstudio',
  }

  nomCarpetaUpload = {
    perfil: 'perfil',
    solicitud: 'solicitud',
    galeria : 'galeria'
  }

}
