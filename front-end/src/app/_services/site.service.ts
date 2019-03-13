import { Injectable } from '@angular/core';
import { siteType } from '../type-site';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs-compat/add/operator/do';

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
export class SiteService {

  private sitesByCategory = 'http://localhost:3000/api/Sites/getByCategory';
  private postPutSitesById = 'http://localhost:3000/api/Sites/save';
  private deleteSiteById = 'http://localhost:3000/api/Sites/delete';
  constructor(private http: HttpClient) { }

  /* GET: get the sites from the server */
  getSites(categoryName: string): Observable<siteType[]> {
    const url = `${this.sitesByCategory}/${categoryName}`;
    return this.http.get<siteType[]>(url, httpOptions);
  }

  /* POST: send the site on the server */
  addSite(site: siteType): Observable<siteType> {
    return this.http.post<siteType>(this.postPutSitesById, site, httpOptions);
  }

  /* PUT: update the site on the server */
  updateSite(site: siteType): Observable<siteType> {
    return this.http.put<siteType>(this.postPutSitesById, site, httpOptions);
  }

  /* DELETE: delete the site on the server */
  deleteSite(site: siteType): Observable<any> {
    const id = site._id;
    const url = `${this.deleteSiteById}/${id}`;
    return this.http.delete(url, httpOptions);
  }
}
