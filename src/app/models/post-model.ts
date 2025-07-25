// src/app/models/post-model.ts
import { UserModel } from './user-model';

export interface PostModel {
  id: string; 
  title: string;
  body: string;
  Img?: string;
  createdAt: Date;
  userId: number;       
  user: UserModel;       
  comments?: string[];
}

