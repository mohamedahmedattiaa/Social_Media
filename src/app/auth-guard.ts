import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from './services/login-service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(): boolean {
    const user = this.loginService.getCurrentUser();
    if (user && user.username) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
  
}
