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
  private categoriesData = 'http://localhost:3000/api/Categories/getByName';
  private categoriesName = 'http://localhost:3000/api/Categories/name';
<<<<<<< HEAD
  private categoriesId = 'http://localhost:3000/api/Categories/save';
=======
  private categoriesId = '/api/Categories/getById';
>>>>>>> c2fa9f9144428000aaf0915db61a62bd0e1c4e40

  constructor(private http: HttpClient) { }
  // Get all the information of the card
  getCards(): Observable<cardType[]> {
    // return this.http.get<cardType[]>(this.categoriesList).do(console);
    return this.http.get<cardType[]>(this.categoriesList).pipe(
      catchError(this.handleError('getHeroes', []))
    );
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
  updateCard(card: cardType): Observable<any> {
    return this.http.put(this.categoriesId, card, httpOptions);
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
