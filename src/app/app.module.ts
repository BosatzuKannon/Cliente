import { DirectiveModule } from './../admin-app/directives/directive.module';
import { AuthInterceptor } from './../admin-app/services/admin/seguridad/http-interceptors/auth-interceptor';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './views/login/login.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { JLayoutsinComponent } from './containers';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import miConfigApp from '../admin-app/services/admin/parameters-config/miConfigApp';

const configSocket: SocketIoConfig = { url: miConfigApp.ApiUrl, options: {} };

import { RegistroCuentaComponent } from './views/registro-cuenta/registro-cuenta.component';
import { ActivarCuentaComponent } from './views/activar-cuenta/activar-cuenta.component';


import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { MOMENT_DATE_FORMATS, MomentDateAdapter } from '../admin-app/utiles/moment-date-adapter';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';


const APP_CONTAINERS = [
  JLayoutsinComponent,
];

@NgModule({
  declarations: [
    LoginComponent,
    AppComponent,
    APP_CONTAINERS,
    RegistroCuentaComponent,
    ActivarCuentaComponent,
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    DirectiveModule,

    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatButtonToggleModule,
    MatIconModule,
    MatDividerModule,
    MatMenuModule,
    MatButtonModule,

    SocketIoModule.forRoot(configSocket),
  ],
  providers: [
    CookieService,
    // {
    //   provide: LocationStrategy,
    //   useClass: HashLocationStrategy
    // },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    { provide: MAT_DATE_FORMATS, useValue: MOMENT_DATE_FORMATS },
    { provide: DateAdapter, useClass: MomentDateAdapter },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
