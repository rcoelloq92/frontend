import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface User {
  email: string;
  id?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'https://backend2025-5fd4578d9bf9.herokuapp.com/api';

  constructor(private http: HttpClient) { }

  getUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/users/${email}`);
  }

  createUser(newUser: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/users`, newUser);
  }
}
