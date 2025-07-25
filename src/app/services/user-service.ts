import { Injectable } from '@angular/core';
import { UserModel } from '../models/user-model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users: UserModel[] = [];

  constructor() {
    this.loadUsersFromLocalStorage();
    if (!localStorage.getItem('users') || this.users.length === 0) {
      this.initializeDefaultUsers();
    }
  }

  getAllUsers(): UserModel[] {
    return this.users;
  }

  getUserById(id: number): UserModel | undefined {
    return this.users.find((user) => user.UserID === id);
  }

  getUserByEmail(email: string): UserModel | undefined {
    return this.users.find((user) => user.email === email);
  }

  addUser(user: UserModel): void {
    this.users.push(user);
    this.saveUsersToLocalStorage();
  }

  generateNextUserId(): number {
    return this.users.length > 0
      ? Math.max(...this.users.map((u) => u.UserID)) + 1
      : 1;
  }

  private saveUsersToLocalStorage(): void {
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  public loadUsersFromLocalStorage(): void {
    const storedUsers = localStorage.getItem('users');
    this.users = storedUsers ? JSON.parse(storedUsers) : [];
  }

  private initializeDefaultUsers(): void {
    const defaultUsers: UserModel[] = [];
    for (let i = 1; i <= 13; i++) {
      defaultUsers.push({
        UserID: i,
        username: `User ${i}`,
        UrlProfile: 'https://wallpapers.com/images/high/luffy-1920-x-1080-picture-cws60alzvwjh0n8o.webp',
        password: `pass${i}`,
        email: `user${i}@example.com`,
      });
    }
    this.users = defaultUsers;
    this.saveUsersToLocalStorage();
  }
  getLoggedInUser(): UserModel | null {
  const userJson = localStorage.getItem('currentUser');
  return userJson ? JSON.parse(userJson) : null;
}
}
