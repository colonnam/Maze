import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { User } from './user';

const httpOptions = {
    headers: new HttpHeaders({
     'Content-Type':  'application/json',
     'Authorization': 'my-auth-token'
    })
  };

@Injectable({
  providedIn: 'root'
})

  
export class UsersService {

  url = 'http://localhost:8080/users'


  constructor(private http: HttpClient) { }

  getUsers() {

    return this.http.get(this.url);
  }

  adduser(user:User): Observable<User> {
    return this.http.post<User>(this.url,user, httpOptions);
  }
  deleteUser(id: number): Observable<{}> {
    const url = `${this.url}/${id}`; // DELETE api/heroes/42
    return this.http.delete(url, httpOptions)
  }
}
