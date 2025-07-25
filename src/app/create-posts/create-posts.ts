import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { PostService } from '../services/post-service';
import { UserService } from '../services/user-service';
import { PostModel } from '../models/post-model';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-posts.html',
  styleUrls: ['./create-posts.css'],
  standalone: false,
})
export class CreatePost implements OnInit {
  title: string = '';
  body: string = '';
  userImage: string = '';

  @Output() postCreated = new EventEmitter<void>();

  constructor(
    private postService: PostService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const user = this.userService.getLoggedInUser();
    if (user) {
      this.userImage = user.UrlProfile || 'assets/default.png';
    } else {
      console.error('No user is logged in.');
    }
  }

  submitPost(): void {
    const currentUser = this.userService.getLoggedInUser();
    if (!currentUser) {
      console.error('User must be logged in to post.');
      return;
    }

    if (!this.title.trim() || !this.body.trim()) {
      console.warn('Title and body are required.');
      return;
    }

    const newPost: PostModel = {
      id: crypto.randomUUID(),
      title: this.title.trim(),
      body: this.body.trim(),
      createdAt: new Date(),
      Img: '',
      userId: currentUser.UserID,
      user: {
        UserID: currentUser.UserID,
        username: currentUser.username,
        password: currentUser.password,
        email: currentUser.email,
        UrlProfile: currentUser.UrlProfile,
      },
      comments: [],
    };

    this.postService.createPost(newPost).subscribe({
      next: () => {
        this.title = '';
        this.body = '';
        this.postCreated.emit(); // 🔥 Inform parent to reload posts
      },
      error: (err) => {
        console.error('Failed to create post:', err);
      }
    });
  }
}
