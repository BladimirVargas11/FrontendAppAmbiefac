import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './Shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CoreModule } from './Core/core.module';
import { ErrorServiceService } from './Core/services/error-service.service';
import { AuthenticationService } from './Core/authentication/authentication.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorInterceptor } from './Core/http/http-error.interceptor';
import { HttpResponseInterceptor } from './Core/http/http-response.interceptor';
import { FeatureModule } from './feature/feature.module';



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    FeatureModule,
    FontAwesomeModule,
    NgbModule,
    NgxSpinnerModule.forRoot(),
    CoreModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
  providers: [ErrorServiceService,]
})
export class AppModule { }
