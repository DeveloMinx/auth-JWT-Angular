import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './componets/navbar/navbar.component';
import { HomeComponent } from './componets/home/home.component';
import { PrivateComponent } from './componets/private/private.component';
import { AdminComponent } from './componets/admin/admin.component';
import { LoginComponent } from './componets/login/login.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { TokenInterceptorService } from './services/tokenInterceptor.service';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    PrivateComponent,
    AdminComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    //JWT
    {provide:JWT_OPTIONS,useValue:JWT_OPTIONS},
    JwtHelperService,
    //Token Interceptor
    {
      provide:HTTP_INTERCEPTORS,useClass:TokenInterceptorService,multi:true
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
