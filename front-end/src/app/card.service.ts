import { Injectable } from '@angular/core';
import {cardType} from './type-card-container';
import { Observable, of } from 'rxjs';
import {HttpClient} from '@angular/common/http';
//import {apiProvaNode} from './apiProvaNode';
import 'rxjs-compat/add/operator/do';
import { catchError, map, tap } from 'rxjs/operators';
import {log} from 'util';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  //private heroesUrl = 'https://jsonplaceholder.typicode.com/todos/1';  // URL to web api
  private cardUrl = 'http://localhost:3000/api/setupGavpass/fullapi';  // URL to web api

  constructor(private http: HttpClient) { }

  // return of(HEROES.find(hero => hero.id === id));

  getCards(): Observable<cardType[]> {
    return this.http.get<cardType[]>(this.cardUrl).do(console);
  }

  /**
  getCard(id: number): Observable<cardType> {
    return of(CARDS.find(card => card.id === id));
  }**/

  getCard(name: string): Observable<cardType> {
    const url = `${this.cardUrl}/${name}`;
    console.log(url);
    return this.http.get<cardType>(url);
  }
}
