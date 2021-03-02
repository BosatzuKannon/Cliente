import { AngularMaterialModule } from '../../../admin-app/directives/angular-material.module';

import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormLoginComponent } from './form-login/form-login.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule
  ],
  declarations: [
    FormLoginComponent
  ],
  exports: [
    FormLoginComponent,
  ],
  entryComponents: [
  ],
  providers: [

  ]
})

export class FormulariosModule { }
