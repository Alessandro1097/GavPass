import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { noteTypeCategories } from '../type-note-categories';
import { cardType } from '../type-card-container';
import { noteType } from './note-type';

const currentToken = localStorage.getItem('currentUser');
let currentT = '';
if (currentToken) {
  currentT = JSON.parse(currentToken).token;
}

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': currentT })
};

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private groupCategory = 'http://localhost:3000/api/Notes/GroupCategory';

  constructor(private http: HttpClient) { }

  /** GET: get all the data about the notes */
  getNote(): Observable<noteTypeCategories[]> {
    return this.http.get<noteTypeCategories[]>(this.groupCategory, httpOptions);
  }

}
