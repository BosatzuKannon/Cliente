import { InicioComponent } from './inicio/inicio.component';
import { Routes } from '@angular/router';

export const MisRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: InicioComponent,
      }
    ]
  }
];
