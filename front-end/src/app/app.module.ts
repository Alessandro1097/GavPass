import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {AppComponent} from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {DemoMaterialModule} from '../material-module';
import {MatNativeDateModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { CardComponent, DialogAddCategoryDialog } from './card/card.component';
import { AppRoutingModule } from './app-routing.module';
import {CardDetailComponent, DialogAddSiteDialog, DialogAttributesDialog} from './card-detail/card-detail.component';
import { NoteComponent } from './note/note.component';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    CardDetailComponent,
    DialogAddCategoryDialog,
    DialogAddSiteDialog,
    NoteComponent,
    DialogAttributesDialog
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
  entryComponents: [CardComponent, DialogAddCategoryDialog, CardDetailComponent, DialogAddSiteDialog, DialogAttributesDialog],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
