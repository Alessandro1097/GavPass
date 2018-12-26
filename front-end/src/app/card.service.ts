import { Injectable } from '@angular/core';
import {cardType} from './type-card-container';
import { Observable, of } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import 'rxjs-compat/add/operator/do';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  private categoriesList = 'http://localhost:3000/api/Categories';
  private categoriesData = 'http://localhost:3000/api/Categories/findByName';
  private categoriesName = 'http://localhost:3000/api/Categories/name';

  constructor(private http: HttpClient) { }
  // Get all the information of the card
  getCards(): Observable<cardType[]> {
    return this.http.get<cardType[]>(this.categoriesList).do(console);
  }
  // Get all list of the categories name
  getCategoriesName(): Observable<cardType[]> {
    return this.http.get<cardType[]>(this.categoriesName).do(console);
  }

  getCard(name: string): Observable<cardType> {
    const url = `${this.categoriesData}/${name}`;
    console.log(url);
    return this.http.get<cardType>(url);
  }
}
