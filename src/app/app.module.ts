import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { GetWeatherInterceptor } from './get-weather.interceptor';
import { GetWeatherService } from './get-weather.service';
import { RequestFormComponent } from './request-form/request-form.component';

@NgModule({
  declarations: [
    AppComponent,
    RequestFormComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    GetWeatherService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GetWeatherInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
