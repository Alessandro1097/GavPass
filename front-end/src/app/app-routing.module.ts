import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardComponent} from './card/card.component';
import { CardDetailComponent } from './card-detail/card-detail.component';
import {NoteComponent} from './note/note.component';

const routes: Routes = [
  {path: '', redirectTo: '/cards', pathMatch: 'full'},
  { path: 'cards', component: CardComponent },
  { path: 'notes', component: NoteComponent },
  { path: 'detail/:name', component: CardDetailComponent },
  // TODO: add this => { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
