import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './imports/material.imports';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { LocalStorageService } from 'src/services/storage/local-storage.service';
import { AuthService } from 'src/services/auth/auth.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoaderComponent } from './UI/loader/loader.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastmsgService } from 'src/services/toaster/toastmsg.service';


@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    LoginComponent,
    SignupComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ...MaterialModule,
  ],
  providers: [
    LocalStorageService,
    AuthService,
    ToastmsgService
  ],
  bootstrap: [
    AppComponent
  ],
  entryComponents: [
    LoginComponent,
    SignupComponent
  ]
})
export class AppModule { }
