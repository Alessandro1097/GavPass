import { Injectable } from '@angular/core';
import { cardType } from '../type-card-container';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs-compat/add/operator/do';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  private categoriesList = 'http://localhost:3000/api/Categories';
  private categoryData = 'http://localhost:3000/api/Categories/getByName';
  private categoriesName = 'http://localhost:3000/api/Categories/name';
  private categorySave = 'http://localhost:3000/api/Categories/save';
  private categoryDeleteById = 'http://localhost:3000/api/Categories/delete';

  constructor(private http: HttpClient) { }

  // Get all the information of the card
  getCards(): Observable<cardType[]> {
    return this.http.get<cardType[]>(this.categoriesList, { headers: { 'Authorization': 'OKAY' } });
  }

  // Get all list of the categories name
  getCategoriesName(): Observable<cardType[]> {
    // FIXME - It's the right one, trust me bro ;)
    // tslint:disable-next-line:max-line-length
    return this.http.get<cardType[]>(this.categoriesName, { headers: { 'Authorization': 'OKAY' } });
    // return this.http.get<cardType[]>(this.categoriesName).do(console);
  }

  // Get card by name
  getCard(name: string): Observable<cardType> {
    const url = `${this.categoryData}/${name}`;
    return this.http.get<cardType>(url, { headers: { 'Authorization': 'OKAY' } });
  }

  /* POST: send the new category on the server */
  addCategory(card: cardType): Observable<cardType> {
    return this.http.post<cardType>(this.categorySave, card, { headers: this.getHeaders() });
  }

  /* DELETE: send the new category on the server */
  deleteCategory(card: cardType): Observable<any> {
    const id = card._id;
    const url = `${this.categoryDeleteById}/${id}`;
    return this.http.delete(url, { headers: this.getHeaders() });
  }

  // Update by id
  updateCard(card: cardType): Observable<any> {
    return this.http.put(this.categorySave, card, { headers: this.getHeaders() });
  }

  getHeaders(): HttpHeaders {
    const currentToken = localStorage.getItem('currentUser');
    const currentT = JSON.parse(currentToken).token;
    return new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': currentT });
  }
}
