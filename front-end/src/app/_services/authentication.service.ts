import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

    private loginUrl = 'http://localhost:3000/api/Users/login';
    private logoutUrl = 'http://localhost:3000/api/Users/logout';

    constructor(private http: HttpClient) { }

    login(email: string, pwd: string): Observable<any> {
        return this.http.post<any>(this.loginUrl, { email, pwd })
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
            localStorage.removeItem('currentUser');
            return this.http.post<any>(this.logoutUrl, currentT.token, { headers: this.getHeaders() });
        }
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }

    getHeaders(): HttpHeaders {
        const currentToken = localStorage.getItem('currentUser');
        let currentT = '';
        if (currentToken) {
            currentT = JSON.parse(currentToken).token;
        }
        return new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': currentT });
    }
}
