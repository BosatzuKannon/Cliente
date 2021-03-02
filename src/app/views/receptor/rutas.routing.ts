import { ViewModelComponent } from './view-model/view-model.component';

import { Routes } from '@angular/router';

export const MisRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'model/:sala',
        component: ViewModelComponent,
      }
    ]
  }
];
