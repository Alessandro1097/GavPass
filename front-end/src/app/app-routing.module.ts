import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardComponent} from './card/card.component';
import { CardDetailComponent } from './card-detail/card-detail.component';
import {HomepageComponent} from './homepage/homepage.component';

const routes: Routes = [
  {path: '', redirectTo: '/homepage', pathMatch: 'full'},
  { path: 'homepage', component: HomepageComponent},
  { path: 'card', component: CardComponent },
  { path: 'detail/:id', component: CardDetailComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
