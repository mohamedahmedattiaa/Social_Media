import { Injectable } from '@angular/core';
import { UserModel } from '../models/user-model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private currentUser: UserModel | null = null;

  constructor() {
  const stored = localStorage.getItem('currentUser');

  if (stored) {
    try {
      this.currentUser = JSON.parse(stored);
    } catch (e) {
      console.error('Invalid JSON in currentUser:', stored);
      this.currentUser = null;
      localStorage.removeItem('currentUser'); // Clean up corrupted data
    }
  } else {
    this.currentUser = null;
  }
}

  getCurrentUser(): UserModel | null {
    return this.currentUser;
  }

  setCurrentUser(user: UserModel): void {
    this.currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  logout(): void {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
  }

  validateUser(email: string, password: string): UserModel | undefined {
    const usersJSON = localStorage.getItem('users');
    const users: UserModel[] = usersJSON ? JSON.parse(usersJSON) : [];
    return users.find(user => user.email === email && user.password === password);
  }

  registerUser(newUser: UserModel): void {
    const usersJSON = localStorage.getItem('users');
    const users: UserModel[] = usersJSON ? JSON.parse(usersJSON) : [];
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
  }

  clearAll(): void {
    localStorage.clear(); // <-- For full wipe
  }
}
