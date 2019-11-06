import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../_models/user';
import { Observable } from 'rxjs';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

@Injectable({ providedIn: 'root' })
export class UserService {

    private createUserUrl = 'http://localhost:3000/api/Users/save';
    private recoverForgottenEmail = 'http://localhost:3000/api/Users/checkEmail';

    constructor(private http: HttpClient) { }

    createUser(user: User): Observable<User> {
        return this.http.post<User>(this.createUserUrl, user, httpOptions);
    }

    recoverEmail(email): Observable<User> {
        return this.http.post<User>(this.recoverForgottenEmail, email, httpOptions);
    }

}
