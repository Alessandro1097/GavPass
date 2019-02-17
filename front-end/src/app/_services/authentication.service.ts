import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

    private loginUrl = 'http://localhost:3000/api/Users/login';
    private logoutUrl = 'http://localhost:3000/api/Users/logout';

    constructor(private http: HttpClient) { }

    login(email: string, pwd: string): Observable<any> {
        return this.http.post<any>(this.loginUrl , { email, pwd })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
                return user;
            }));
    }
    logout(): Observable<any> {
        const currentToken = localStorage.getItem('currentUser');
        if (currentToken) {
            const currentT = JSON.parse(currentToken);
            return this.http.post<any>(this.logoutUrl, currentT.token, httpOptions);
        }
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}
