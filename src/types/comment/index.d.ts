import { User } from "user";

declare module "comment" {
  export interface WriteCommentProps {
    content: string;
    userId: string;
    reviewId: string;
  }

  export interface WriteReplyProps {
    userId: string;
    content: string;
    parentCommentId: string;
  }

  export interface Comment {
    id: string;
    content: string;
    reviewId: string;
    createdAt: Date;
    user: User;
    comments: ChildComment[];
  }

  export interface ChildComment {
    id: string;
    content: string;
    createdAt: Date;
    user: User;
  }
}
