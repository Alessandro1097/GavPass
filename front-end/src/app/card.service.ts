import { Injectable } from '@angular/core';
import {cardType} from './type-card-container';
import { Observable, of } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs-compat/add/operator/do';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CardService {

  private categoriesList = 'http://localhost:3000/api/Categories';
  private categoriesData = 'http://localhost:3000/api/Categories/findByName';
  private categoriesName = 'http://localhost:3000/api/Categories/name';
  private categoriesId = '/api/Categories/findById';

  constructor(private http: HttpClient) { }
  // Get all the information of the card
  getCards(): Observable<cardType[]> {
    return this.http.get<cardType[]>(this.categoriesList).do(console);
  }
  // Get all list of the categories name
  getCategoriesName(): Observable<cardType[]> {
    return this.http.get<cardType[]>(this.categoriesName).do(console);
  }
  // get card by name
  getCard(name: string): Observable<cardType> {
    const url = `${this.categoriesData}/${name}`;
    console.log(url);
    return this.http.get<cardType>(url);
  }
  // update by id
  updateHero (card: cardType): Observable<any> {
    return this.http.put(this.categoriesId, card, httpOptions);
  }
}
