import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { noteType } from '../note-type';
import { noteTypeCategories } from '../type-note-categories';

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
  private categoryNoteList = 'http://localhost:3000/api/NoteCategories';
  private postNota = 'http://localhost:3000/api/Notes/save';
  private deleteNoteById = 'http://localhost:3000/api/Notes/delete';
  private postCategoryNota = 'http://localhost:3000/api/NoteCategories/save';
  private deleteCategory = 'http://localhost:3000/api/NoteCategories/delete';

  constructor(private http: HttpClient) { }

  /** GET: get all the data about the notes */
  getNote(): Observable<noteType[]> {
    return this.http.get<noteType[]>(this.groupCategory, httpOptions);
  }

  /** GET: get all the data about the category of the notes */
  getCategoryNoteList(): Observable<noteTypeCategories[]> {
    return this.http.get<noteTypeCategories[]>(this.categoryNoteList, httpOptions);
  }

  /* POST: send the note on the server */
  addNote(note: noteType): Observable<noteType> {
    return this.http.post<noteType>(this.postNota, note, httpOptions);
  }

  /* POST: send the category of the note on the server */
  addNoteCategory(noteCategory: noteTypeCategories): Observable<noteTypeCategories> {
    return this.http.post<noteTypeCategories>(this.postCategoryNota, noteCategory, httpOptions);
  }

  /* DELETE: delete the note from the server */
  deleteNote(note: noteType): Observable<any> {
    const id = note._id;
    const url = `${this.deleteNoteById}/${id}`;
    return this.http.delete(url, httpOptions);
  }

  /* DELETE: delete the category (note) from the server */
  deleteCategoryNote(categoryNote: noteTypeCategories): Observable<any> {
    const id = categoryNote._id;
    const url = `${this.deleteCategory}/${id}`;
    return this.http.delete(url, httpOptions);
  }

}
