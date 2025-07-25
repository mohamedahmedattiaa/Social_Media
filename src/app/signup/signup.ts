import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from '../models/user-model';
import { UserService } from '../services/user-service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.html',
  styleUrls: ['./signup.css'],
  standalone: false
})
export class Signup {
  signupData: Omit<UserModel, 'UserID' | 'UrlProfile'> = {
    username: '',
    password: '',
    email: ''
  };

  selectedFile: File | null = null;
  previewUrl: string | null = null;

  constructor(private userService: UserService, private router: Router) {}

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onSignup(): void {
    if (!this.selectedFile || !this.previewUrl) {
      alert('Please select a profile image before signing up.');
      return;
    }

    const newUser: UserModel = {
      ...this.signupData,
      UrlProfile: this.previewUrl,
      UserID: this.userService.generateNextUserId()
    };

    console.log("Saving new user:", newUser); 
    this.userService.addUser(newUser);
    this.router.navigate(['/login']);
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }
}
