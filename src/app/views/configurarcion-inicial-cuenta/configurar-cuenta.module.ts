import { DirectiveModule } from './../../../admin-app/directives/directive.module';
import { CuentaModelComponent } from './cuenta-model/cuenta-model.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { VideoChatModule } from './../../shared-component/video-chat/video-chat.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MisRoutes } from './rutas.routing';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';

import { FileUploadModule } from 'primeng/fileupload';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(MisRoutes),
    VideoChatModule,
    DirectiveModule,

    MatDatepickerModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatTabsModule,

    FileUploadModule

  ],
  declarations: [
    CuentaModelComponent
  ],
  providers: [

  ],
})
export class ConfigurarCuentaModule { }
