import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {AppComponent} from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {DemoMaterialModule} from '../material-module';
import {MatNativeDateModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { CardComponent, DialogAddSiteDialog } from './card/card.component';
import { AppRoutingModule } from './app-routing.module';
import {CardDetailComponent, DialogAttributesDialog, DialogModifySite} from './card-detail/card-detail.component';
import { NoteComponent } from './note/note.component';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    CardDetailComponent,
    DialogAddSiteDialog,
    NoteComponent,
    DialogAttributesDialog,
    DialogModifySite
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
  ],
  entryComponents: [CardComponent, CardDetailComponent, DialogAddSiteDialog, DialogAttributesDialog, DialogModifySite],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
