import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserActionService {
  private actions: {
    [postId: string]: { likes: number; comments: number; shares: number };
  } = {};

  private readonly actionMap = {
    like: 'likes',
    comment: 'comments',
    share: 'shares',
  } as const;

  createPost(title: string, body: string, userId: number): void {
    const postId = Date.now().toString();
    console.log(`Post created by User ${userId}:`, { postId, title, body });

    this.actions[postId] = { likes: 0, comments: 0, shares: 0 };
    alert(`Post created by user ${userId}`);
  }

  saveAction(postId: string, actionType: keyof typeof this.actionMap, userId: number): void {
    const key = this.actionMap[actionType];
    if (!this.actions[postId]) {
      this.actions[postId] = { likes: 0, comments: 0, shares: 0 };
    }
    this.actions[postId][key]++;
    alert(`User ${userId} performed '${actionType}' on post ${postId}`);
  }

  getActionCount(postId: string, actionType: keyof typeof this.actionMap): number {
    const key = this.actionMap[actionType];
    return this.actions[postId]?.[key] ?? 0;
  }
}

