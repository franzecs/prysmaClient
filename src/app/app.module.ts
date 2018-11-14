import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';

import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@Angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './config/app-routing.module';
import { ComponentsModule } from './components/components.module';
import { LayoutModule } from './pages/layout/layout.module';
import { AuthInterceptor } from './components/security/auth.interceptor';
import { AplicationErrorHandle } from './config/app.error-handle';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    ComponentsModule,
    LayoutModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor,multi: true},
    {provide: ErrorHandler, useClass: AplicationErrorHandle},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
