export type ActionType = 'like' | 'comment' | 'share';

export interface UserActionModel {
  postId: string;
  userId: number;
  action: ActionType;
  timestamp: Date;
}
