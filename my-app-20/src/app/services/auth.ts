import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class Auth {
  constructor(private http: HttpClient) { }

    login(credentials: { email: string, password: string }) {
        console.log(`${credentials.email} - ${credentials.password}`);
        return this.http.post('/api/auth/login', credentials);
    }
}
