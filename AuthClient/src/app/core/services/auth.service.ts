import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TokenService } from './token.service';
import { Router } from '@angular/router';

export interface LoginResponse {
  isAuthSuccessful: boolean;
  username: string;
  role: string;
  token: string;
  errorMessage?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = environment.apiUrl + '/api/auth';
  private isAuthenticated = new BehaviorSubject<boolean>(this.tokenService.getToken() !== null);
  isAuthenticated$ = this.isAuthenticated.asObservable();

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private router: Router
  ) {}

  login(credentials: { username: string; password: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.apiUrl + '/login', credentials).pipe(
      tap(response => {
        if (response.isAuthSuccessful) {
          this.tokenService.saveToken(response.token!);
          this.tokenService.saveUser({
            username: response.username!,
            role: response.role!
          });
          this.isAuthenticated.next(true);
          this.redirectBasedOnRole(response.role!);
        }
      })
    );
  }

  logout(): void {
    this.tokenService.removeToken();
    this.tokenService.removeUser();
    this.isAuthenticated.next(false);
    this.router.navigate(['/login']);
  }

  redirectBasedOnRole(role: string): void {
    const routes: Record<string, string> = {
      'admin': '/admin',
      'post1': '/post1',
      'post2': '/post2',
      'post3': '/post3',
      'post4': '/post4',
      'post5': '/post5'
    };
    this.router.navigate([routes[role] || '/']);
  }
}
