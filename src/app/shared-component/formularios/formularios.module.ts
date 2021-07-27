import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormLoginComponent } from './form-login/form-login.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
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
