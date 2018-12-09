import { Injectable } from '@angular/core';
import {cardType} from './type-card-container';
import {CARDS} from './mock-card';
import { Observable, of } from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  private heroesUrl = 'localhost:312/api/categories';  // URL to web api

  constructor(private http: HttpClient) { }

  getCards(): Observable<cardType[]> {
    return this.http.get<cardType[]>(this.heroesUrl);
  }

  getCard(id: number): Observable<cardType> {
    return of(CARDS.find(card => card.id === id));
  }
}
