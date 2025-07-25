import { Component, OnInit } from '@angular/core';
import { PostModel } from '../models/post-model';
import { PostService } from '../services/post-service';
import { UserService } from '../services/user-service';
import { UserActionService } from '../services/user-action-service';

@Component({
  selector: 'app-posts',
  standalone: false,
  templateUrl: './posts.html',
  styleUrls: ['./posts.css'],
})
export class Posts implements OnInit {
  posts: PostModel[] = [];
  commentText: { [postId: string]: string } = {};
  commentVisibility: { [postId: string]: boolean } = {};
  currentUserId: number = 1;

  constructor(
    private postService: PostService,
    private userService: UserService,
    private userActionService: UserActionService
  ) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  // ✅ Called when CreatePost emits postCreated
  onPostCreated(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.postService.getposts().subscribe({
      next: (rawPosts) => {
        this.posts = rawPosts.map((post) => {
          const user = this.userService.getUserById(post.userId);
          if (!user) {
            throw new Error(`User not found with ID: ${post.userId}`);
          }
          return {
            ...post,
            user,
            createdAt: new Date(post.createdAt),
          };
        });
      },
      error: (err) => {
        console.error('Error loading posts:', err);
      },
    });
  }

  addComment(postId: string): void {
    const comment = this.commentText[postId]?.trim();
    if (!comment) return;

    this.postService.addComment(postId, comment).subscribe(() => {
      this.userActionService.saveAction(postId, this.currentUserId, 'comment');
      this.commentText[postId] = '';
      this.loadPosts();
    });
  }

  removeComment(postId: string, index: number): void {
    this.postService.removeComment(postId, index).subscribe(() => {
      this.loadPosts();
    });
  }

  deletePost(postId: string): void {
    this.postService.deletePost(postId).subscribe(() => {
      this.posts = this.posts.filter((post) => post.id !== postId);
    });
  }

  toggleComment(postId: string): void {
    this.commentVisibility[postId] = !this.commentVisibility[postId];
  }

  onAction(postId: string, action: 'like' | 'share' | 'comment'): void {
    this.userActionService.saveAction(postId, this.currentUserId, action);
  }

  getActionCount(postId: string, action: 'like' | 'share' | 'comment'): number {
    return this.userActionService.getActionCount(postId, action);
  }
}
