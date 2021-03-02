import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';

import { CommonModule } from "@angular/common";
import { ErrorRoutes } from './error.routing';
import { P404Component } from './not-fount/not-fount.component';

@NgModule({
  imports: [
    RouterModule.forChild(ErrorRoutes),
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatExpansionModule,
    CommonModule
  ],
  declarations: [
    P404Component
  ],
  providers: [

  ],
})
export class ErrorModule { }
