import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { DatosSessionService } from '../datos-session/datos-session.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardService implements CanActivate {

  constructor(
    private datosSessionService: DatosSessionService,
    private router: Router
  ) {

  }


  canActivate() {
    let tokenSession = this.datosSessionService.verificarToken();
    if (tokenSession != null) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }

  }

}
