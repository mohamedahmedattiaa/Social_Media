import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login-service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
})
export class Navbar {
  navitem: string[] = ['Home', 'About', 'Services', 'Contact'];
  activeitem: string = 'Home';

  constructor(private router: Router, private loginService: LoginService) {}

  setActiveItem(item: string): void {
    this.activeitem = item;
  }

  logout(): void {
    console.log("Logging out...");
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
}
