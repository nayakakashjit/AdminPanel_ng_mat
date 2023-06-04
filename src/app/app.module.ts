import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './shared/nav/nav.component';
import { FooterComponent } from './shared';
import { SharedModule } from './shared/shared.module';
// import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModules } from './material-modules/material.modules';
import { HttpClientModule } from '@angular/common/http';
import { httpInterceptorProviders } from './core/interceptors/http.interceptor';
import { errorInterceptorProviders } from './core/interceptors/error.interceptor';
import { LoaderComponent } from './shared/loader/loader.component';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavComponent,
    LoaderComponent

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    MaterialModules,
  ],
  // providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  providers: [httpInterceptorProviders, errorInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
