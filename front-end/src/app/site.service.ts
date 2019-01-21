import { Injectable } from '@angular/core';
import { siteType } from './type-site';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs-compat/add/operator/do';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class SiteService {

  private sitesByCategory = 'http://localhost:3000/api/Sites/getByCategory';
  private postSitesById = 'http://localhost:3000/api/Sites/save';
  constructor(private http: HttpClient) { }

  // Get sites by category name
  getSites(categoryName: string): Observable<siteType[]> {
    const url = `${this.sitesByCategory}/${categoryName}`;
    return this.http.get<siteType[]>(url);
  }

  // Post site
  addSite(site: siteType): Observable<siteType> {
    return this.http.post<siteType>(this.postSitesById, site, httpOptions).do(console);
  }

}
