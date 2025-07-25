import { Injectable } from '@angular/core';

type ActionType = 'like' | 'comment' | 'share';

interface ActionCounts {
  likes: number;
  comments: number;
  shares: number;
}

@Injectable({ providedIn: 'root' })
export class UserActionService {
  private actions: Record<string, ActionCounts> = {};

  private readonly actionMap: Record<ActionType, keyof ActionCounts> = {
    like: 'likes',
    comment: 'comments',
    share: 'shares',
  };

  saveAction(postId: string, userId: number, actionType: ActionType): void {
    if (!this.actions[postId]) {
      this.actions[postId] = { likes: 0, comments: 0, shares: 0 };
    }

    const actionKey = this.actionMap[actionType];
    this.actions[postId][actionKey]++;
    alert(`User ${userId} performed '${actionType}' on post ${postId}`);
  }

  getActionCount(postId: string, actionType: ActionType): number {
    const actionKey = this.actionMap[actionType];
    return this.actions[postId]?.[actionKey] ?? 0;
  }

  getAllActions(postId: string): ActionCounts {
    return this.actions[postId] ?? { likes: 0, comments: 0, shares: 0 };
  }
  
}
