import { Injectable } from '@angular/core';
import { siteType } from './type-site';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import 'rxjs-compat/add/operator/do';

@Injectable({
  providedIn: 'root'
})
export class SiteService {

  private sitesByCategory = 'http://localhost:3000/api/Sites/getByCategory';

  constructor(private http: HttpClient) { }

  // Get sites by category name
  getSites(categoryName: string): Observable<siteType[]> {
    const url = `${this.sitesByCategory}/${categoryName}`;
    console.log(url);
    return this.http.get<siteType[]>(url);
  }
}