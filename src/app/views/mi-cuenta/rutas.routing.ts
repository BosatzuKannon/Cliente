import { MiCuentaModelComponent } from './mi-cuenta-model/mi-cuenta-model.component';

import { Routes } from '@angular/router';

export const MisRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'model',
        component: MiCuentaModelComponent,
      }
    ]
  }
];
