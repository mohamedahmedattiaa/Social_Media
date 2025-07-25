import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  standalone:false
})
export class Login implements OnInit {
  loginData = {
    email: '',
    password: ''
  };

  errorMessage = '';

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {
    const user = this.loginService.getCurrentUser();
    if (user) this.router.navigate(['/posts']);
  }

  onLogin(): void {
    const user = this.loginService.validateUser(
      this.loginData.email,
      this.loginData.password
    );

    if (user) {
      this.loginService.setCurrentUser(user);
      this.router.navigate(['/posts']);
    } else {
      this.errorMessage = 'Invalid email or password.';
    }
  }

  navigateToSignup(): void {
    this.router.navigate(['/signup']);
  }
}
