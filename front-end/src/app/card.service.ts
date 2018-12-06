import { Injectable } from '@angular/core';
import {cardType} from './type-card-container';
import {CARDS} from './mock-card';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor() { }

  getCards(): Observable<cardType[]> {
    return of (CARDS);
  }

  getCard(id: number): Observable<cardType> {
    return of(CARDS.find(card => card.id === id));
  }


}
