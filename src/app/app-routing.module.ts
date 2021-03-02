import { RegistroCuentaComponent } from './views/registro-cuenta/registro-cuenta.component';
import { LoginGuardService } from './../admin-app/services/admin/seguridad/login-guard/login.guard.service';
import { LoginComponent } from './views/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JLayoutsinComponent } from './containers/j-layoutsin';
import { ActivarCuentaComponent } from './views/activar-cuenta/activar-cuenta.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    component: JLayoutsinComponent,
    path: 'home',
    loadChildren: () => import('./views/principal/principal.module').then(m => m.PrincipalModule)
  },
  {
    component: JLayoutsinComponent,
    path: 'web-cam',
    canActivate: [LoginGuardService],
    loadChildren: () => import('./views/emisor/emisor.module').then(m => m.EmisorModule)
  },
  {
    component: JLayoutsinComponent,
    path: 'view-model',
    // canActivate: [LoginGuardService],
    loadChildren: () => import('./views/receptor/receptor.module').then(m => m.ReceptorModule)
  },
  {
    component: JLayoutsinComponent,
    path: 'config-account',
    canActivate: [LoginGuardService],
    loadChildren: () => import('./views/configurarcion-inicial-cuenta/configurar-cuenta.module').then(m => m.ConfigurarCuentaModule)
  },
  {
    component: JLayoutsinComponent,
    path: 'my-account',
    canActivate: [LoginGuardService],
    loadChildren: () => import('./views/mi-cuenta/mi-cuenta.module').then(m => m.MiCuentaModule)
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegistroCuentaComponent,
    data: {
      title: 'Register Page'
    }
  },
  {
    path: 'activation-account/:llave',
    component: ActivarCuentaComponent,
    data: {
      title: 'Activation account'
    }
  },
  {
    path: 'error',
    loadChildren: () => import('./views/error/error.module').then(m => m.ErrorModule)
  },
  {
    path: '**', redirectTo: '/error/404'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
