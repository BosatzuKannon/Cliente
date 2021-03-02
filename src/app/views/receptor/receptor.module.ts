import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { VideoChatModule } from './../../shared-component/video-chat/video-chat.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MisRoutes } from './rutas.routing';
import { ViewModelComponent } from './view-model/view-model.component';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

import { CarouselModule } from 'primeng/carousel';

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
    MatButtonModule,

    CarouselModule
  ],
  declarations: [

    ViewModelComponent],
  providers: [

  ],
})
export class ReceptorModule { }
