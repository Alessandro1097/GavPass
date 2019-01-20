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
import {CardDetailComponent, DialogModifySiteInsideDialog, DialogModifySiteInside} from './card-detail/card-detail.component';
import { NoteComponent } from './note/note.component';
import {MatDialogModule} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    CardDetailComponent,
    DialogAddSiteDialog,
    NoteComponent,
    DialogModifySiteInsideDialog,
    DialogModifySiteInside
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
  entryComponents: [CardComponent, CardDetailComponent, DialogAddSiteDialog, DialogModifySiteInsideDialog, DialogModifySiteInside],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
