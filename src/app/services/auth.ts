import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

const TOKEN_KEY = 'token';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private api = 'http://localhost:5133/api'; // ajuste

  login(email: string, senha: string): Observable<{ token: string }> {
    return this.http
      .post<{ token: string }>(`${this.api}/Auth/login`, { email, senha })
      .pipe(tap(res => localStorage.setItem(TOKEN_KEY, res.token)));
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
  }

  get token(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  get isLoggedIn(): boolean {
    return !!this.token;
  }
}
