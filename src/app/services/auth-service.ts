import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.checkLoginStatus());
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  private checkLoginStatus(): boolean {
    return !!localStorage.getItem('currentUser');
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.isLoggedInSubject.next(false); // 🔥 update subscribers
  }

  login(user: any): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.isLoggedInSubject.next(true); // 🔥 update subscribers
  }

  isAuthenticated(): boolean {
    return this.isLoggedInSubject.getValue();
  }
}
