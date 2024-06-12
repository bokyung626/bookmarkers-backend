import { Comment } from "../../../types";
import { User } from "../../../types/user";
import { UserDTO } from "../../users/dto";
import { ChildCommentDTO } from "./childComment.dto";

export class CommentDTO {
  id: string;
  content: string;
  reviewId: string;
  createdAt: Date;
  user: UserDTO;
  childComments: ChildCommentDTO[];

  constructor(props: {
    id: string;
    content: string;
    reviewId: string;
    createdAt: Date;
    user: User;
    comments: ChildCommentDTO[];
  }) {
    this.id = props.id;
    this.content = props.content;
    this.reviewId = props.reviewId;
    this.createdAt = props.createdAt;
    this.user = new UserDTO(props.user);
    this.childComments = props.comments.map(
      (childComment) => new ChildCommentDTO(childComment)
    );
  }
}
