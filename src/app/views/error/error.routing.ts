import { Routes } from '@angular/router';
import { P404Component } from './not-fount/not-fount.component';


export const ErrorRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '404', component: P404Component
      },
    ]
  }
];