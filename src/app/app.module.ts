import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ExampleInterceptorInterceptor} from "./intercepter/example-interceptor.interceptor";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: ExampleInterceptorInterceptor, multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
