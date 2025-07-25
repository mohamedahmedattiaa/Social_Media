// src/app/services/post-service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostModel } from '../models/post-model';
import { UserService } from './user-service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PostService {
  private apiUrl = 'http://localhost:3000/posts';

  constructor(private http: HttpClient, private userService: UserService) {}

  // ✅ Get all posts and attach user data
  getposts(): Observable<PostModel[]> {
    return new Observable((observer) => {
      this.http.get<any[]>(this.apiUrl).subscribe({
        next: (posts) => {
          const result: PostModel[] = [];
          for (const post of posts) {
            const user = this.userService.getUserById(post.userId);
            if (user) {
              result.push({
                ...post,
                user,
                createdAt: new Date(post.createdAt),
              });
            }
          }
          observer.next(result);
          observer.complete();
        },
        error: (err) => observer.error(err),
      });
    });
  }

  // ✅ Create post
  createPost(post: PostModel): Observable<PostModel> {
    const payload = {
      title: post.title,
      body: post.body,
      Img: post.Img || '',
      createdAt: post.createdAt,
      userId: post.user?.UserID,
      comments: post.comments || [],
    };
    return this.http.post<PostModel>(this.apiUrl, payload);
  }

  // ✅ Delete post
  deletePost(postId: string | number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${postId}`);
  }

  // ✅ Add comment
  addComment(postId: string, comment: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${postId}`).pipe(
    );
  }

  // ✅ Remove comment
  removeComment(postId: string, commentIndex: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${postId}`).pipe(
    );
  }
}
