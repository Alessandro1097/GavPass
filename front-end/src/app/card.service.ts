import { Injectable } from '@angular/core';
import { cardType } from './type-card-container';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs-compat/add/operator/do';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CardService {

  private categoriesList = 'http://localhost:3000/api/Categories';
  private categoryData = 'http://localhost:3000/api/Categories/getByName';
  private categoriesName = 'http://localhost:3000/api/Categories/name';
  private categorySave = 'http://localhost:3000/api/Categories/save';

  constructor(private http: HttpClient) { }

  // Get all the information of the card
  getCards(): Observable<cardType[]> {
    return this.http.get<cardType[]>(this.categoriesList).do(console);
  }

  // Get all list of the categories name
  getCategoriesName(): Observable<cardType[]> {
    // FIXME - It's the right one, trust me bro ;)
    return this.http.get<cardType[]>(this.categoriesName, { headers: {'Authorization': "NON CORRETTO eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjNTRmN2U2MTI3M2UwMThjOGY0YzNjNSIsImlhdCI6MTU0OTA3MzMyNywiZXhwIjoxNTQ5MTU5NzI3fQ.gQ0bYHkOHaax3sOH2omsw9GM1jNOiTGVoJBYu5ZFKVs"} }).do(console);
    //return this.http.get<cardType[]>(this.categoriesName).do(console);
  }

  // Get card by name
  getCard(name: string): Observable<cardType> {
    const url = `${this.categoryData}/${name}`;
    return this.http.get<cardType>(url);
  }

  // Update by id
  updateCard(card: cardType): Observable<any> {
    return this.http.put(this.categorySave, card, httpOptions);
  }
}
