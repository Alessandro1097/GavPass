import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { CardComponent} from './card/card.component';
import {HomepageComponent} from './homepage/homepage.component';


const routes: Routes = [
  { path: 'card', component: CardComponent },
  { path: 'homepage', component: HomepageComponent }
];


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
