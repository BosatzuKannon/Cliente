import { CuentaModelComponent } from './cuenta-model/cuenta-model.component';

import { Routes } from '@angular/router';

export const MisRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'model',
        component: CuentaModelComponent,
      }
    ]
  }
];
