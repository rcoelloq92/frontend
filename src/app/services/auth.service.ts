import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';

interface User {
  email: string;
  id?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = `${environment.apiUrl}/api`;


  constructor(private http: HttpClient) { }

  getUserByEmail(email: string): Observable<User> {
    console.log(this.baseUrl);
    return this.http.get<User>(`${this.baseUrl}/users/${email}`);
  }

  createUser(newUser: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/users`, newUser);
  }
}
