import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import { Router } from '@angular/router';
import {User} from "../interfaces/user";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) { }

  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Accept': 'application/json'
    })
  };

  login(email: string, password: string): Observable<any> {
    return this.http.post('http://padlet2023.s2010456030.student.kwmhgb.at/api/auth/login', {email, password}, this.httpOptions)
      .pipe(
        tap((response: any) => {
          localStorage.setItem('access_token', response.access_token);
          this.router.navigate(['/padlets']);
        }),
        catchError(error => {
          console.error('There was an error during the request:', error);
          return throwError(error);
        })
      );
  }

  logout() {
    // logic to remove token from local storage and redirect user to login page
    localStorage.removeItem('access_token');
    this.router.navigate(['/home']);
  }
  getUsername() {
    const token = localStorage.getItem('access_token');
    if(!token) {
      return null;
    }

    // token split into three parts [header, payload, signature]
    const parts = token.split('.');

    // Base64 decoding
    let decoded = atob(parts[1]);

    // Parse JSON
    const payload = JSON.parse(decoded);

    // payload should contain user info
    const username = payload.user.id;
  console.log(username);
    return username;
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`http://padlet2023.s2010456030.student.kwmhgb.at/api/user/${id}`);
  }

}
