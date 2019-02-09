import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoMaterialModule } from '../material-module';
import { MatNativeDateModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CardComponent, AddSiteComponent, AddCategoryComponent, DeleteCategoryComponent } from './card/card.component';
import { AppRoutingModule } from './app-routing.module';
// tslint:disable-next-line:max-line-length
import { CardDetailComponent, ModifySiteInsideComponent, AddSiteInsideComponent, DeleteSiteComponent } from './card-detail/card-detail.component';
import { NoteComponent } from './note/note.component';
import { MatDialogModule } from '@angular/material';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { SingUpComponent } from './sing-up/sing-up.component';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    CardDetailComponent,
    AddSiteComponent,
    NoteComponent,
    ModifySiteInsideComponent,
    AddSiteInsideComponent,
    DeleteSiteComponent,
    AddCategoryComponent,
    DeleteCategoryComponent,
    HomeComponent,
    LoginComponent,
    SingUpComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    DemoMaterialModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatDialogModule
  ],
  // tslint:disable-next-line:max-line-length
  entryComponents: [CardComponent, CardDetailComponent, AddSiteComponent, ModifySiteInsideComponent, AddSiteInsideComponent, DeleteSiteComponent, AddCategoryComponent, DeleteCategoryComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
