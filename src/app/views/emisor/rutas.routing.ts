import { ModeloWebCamComponent } from './modelo-web-cam/modelo-web-cam.component';

import { Routes } from '@angular/router';

export const MisRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'model',
        component: ModeloWebCamComponent,
      }
    ]
  }
];
