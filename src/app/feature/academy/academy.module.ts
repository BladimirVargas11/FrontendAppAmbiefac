import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcademyRoutingModule } from './academy-routing.module';
import { ClientModule } from './client/client.module';
import { SharedModule } from 'src/app/Shared/shared.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpErrorInterceptor } from 'src/app/Core/http/http-error.interceptor';
import { HttpResponseInterceptor } from 'src/app/Core/http/http-response.interceptor';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AcademyRoutingModule,
    SharedModule
    
  ],
  providers: []
})
export class AcademyModule { }
