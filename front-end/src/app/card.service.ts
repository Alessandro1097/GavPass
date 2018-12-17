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
  private cardUrl = 'http://localhost:312/api/categories';  // URL to web api

  constructor(private http: HttpClient) { }

  // API to get the data, .do(console.log) => log the content of the observable
  /**getApiNode(): Observable<apiProvaNode[]> {
    return this.http.get<apiProvaNode[]>(this.cardUrl);
  }**/

  // return of(HEROES.find(hero => hero.id === id));

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getCards(): Observable<cardType[]> {
    return this.http.get<cardType[]>(this.cardUrl).pipe(
      catchError(this.handleError('getHeroes', []))
    );
  }

  /**
  getCard(id: number): Observable<cardType> {
    return of(CARDS.find(card => card.id === id));
  }**/

  getCard(_id: number): Observable<cardType> {
    const url = `${this.cardUrl}/${_id}`;
    return this.http.get<cardType>(url);
  }
}
