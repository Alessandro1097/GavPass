import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardComponent} from './card/card.component';
import { CardDetailComponent } from './card-detail/card-detail.component';
import { NoteComponent } from './note/note.component';
import { AuthGuard } from './_guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { SingUpComponent } from './sing-up/sing-up.component';
import {NotFound404Component} from './not-found404/not-found404.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'sing-up', component: SingUpComponent },
  { path: 'notes', component: NoteComponent },
  { path: 'detail/:name', component: CardDetailComponent },
  { path: '', component: CardComponent, canActivate: [AuthGuard] },
  { path: '**', component: NotFound404Component }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
