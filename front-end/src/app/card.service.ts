import { Injectable } from '@angular/core';
import {cardType} from './type-card-container';
import { Observable, of } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import 'rxjs-compat/add/operator/do';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  private cardUrl = 'http://localhost:3000/api/setupGavpass/fullapi';  // URL to web api

  constructor(private http: HttpClient) { }

  getCards(): Observable<cardType[]> {
    return this.http.get<cardType[]>(this.cardUrl).do(console);
  }

  getCard(name: string): Observable<cardType> {
    const url = `${this.cardUrl}/${name}`;
    console.log(url);
    return this.http.get<cardType>(url);
  }
}
