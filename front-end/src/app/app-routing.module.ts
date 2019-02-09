import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardComponent} from './card/card.component';
import { CardDetailComponent } from './card-detail/card-detail.component';
import {NoteComponent} from './note/note.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './_guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { SingUpComponent } from './sing-up/sing-up.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'sing-up', component: SingUpComponent },
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
