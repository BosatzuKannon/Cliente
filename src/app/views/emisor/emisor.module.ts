import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { VideoChatModule } from './../../shared-component/video-chat/video-chat.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MisRoutes } from './rutas.routing';
import { ModeloWebCamComponent } from './modelo-web-cam/modelo-web-cam.component';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(MisRoutes),
    VideoChatModule,

    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatButtonModule
  ],
  declarations: [
    ModeloWebCamComponent
  ],
  providers: [

  ],
})
export class EmisorModule { }
