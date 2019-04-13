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

  private categoryNote = 'http://localhost:3000/api/Notes';
  private categoryNoteList = 'http://localhost:3000/api/NoteCategories';
  private categoryNoteName = 'http://localhost:3000/api/NoteCategories/name';

  constructor(private http: HttpClient) { }

  /** GET: get all the data about the notes */
  getNote(): Observable<noteType[]> {
    return this.http.get<noteType[]>(this.categoryNote, httpOptions);
  }

  /** GET: get all the data about the category of the notes */
  getCategoryNoteList(): Observable<noteTypeCategories[]> {
    return this.http.get<noteTypeCategories[]>(this.categoryNoteList, httpOptions);
  }

  /** GET: get all the names of the notes */
  getNoteName(): Observable<noteTypeCategories[]> {
    return this.http.get<noteTypeCategories[]>(this.categoryNoteName, httpOptions);
  }
}
