import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoMaterialModule } from '../material-module';
import { MatNativeDateModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CardComponent, AddSiteComponent } from './card/card.component';
import { AppRoutingModule } from './app-routing.module';
// tslint:disable-next-line:max-line-length
import { CardDetailComponent, ModifySiteInsideComponent, AddSiteInsideComponent, DeleteSiteComponent } from './card-detail/card-detail.component';
import { NoteComponent } from './note/note.component';
import { MatDialogModule } from '@angular/material';

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
  entryComponents: [CardComponent, CardDetailComponent, AddSiteComponent, ModifySiteInsideComponent, AddSiteInsideComponent, DeleteSiteComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
