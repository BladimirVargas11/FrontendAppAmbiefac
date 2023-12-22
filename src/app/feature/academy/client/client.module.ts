import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientRoutingModule } from './client-routing.module';

import { ClientCursosComponent } from './components/client-cursos/client-cursos.component';
import { MiAprendizajeComponent } from './components/mi-aprendizaje/mi-aprendizaje.component';
import { MisLogrosComponent } from './components/mis-logros/mis-logros.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { ComponentsModule } from '../../components/components.module';
import { RouterModule } from '@angular/router';
import { PageClientComponent } from './components/page-client/page-client.component';
import { TabsClientComponent } from './components/tabs-client/tabs-client.component';
import { SharedModule } from 'src/app/Shared/shared.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpErrorInterceptor } from 'src/app/Core/http/http-error.interceptor';
import { HttpResponseInterceptor } from 'src/app/Core/http/http-response.interceptor';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [
    ClientCursosComponent,
    PerfilComponent,
    MiAprendizajeComponent,
    MisLogrosComponent,
    PageClientComponent,
    TabsClientComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ClientRoutingModule,
    ComponentsModule,
    RouterModule,
    SharedModule
  ],
  providers:[
    
  ]
})
export class ClientModule { }
