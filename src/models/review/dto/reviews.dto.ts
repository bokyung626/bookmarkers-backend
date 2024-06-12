import { Comment } from "../../../types";
import { User } from "../../../types/user";
import { CommentDTO } from "../../comment/dto/comment.dto";
import { UserDTO } from "../../users/dto";

export class ReviewsDTO {
  id: string;
  title: string;
  content: string;
  memory: string;
  createdAt: Date;
  isbn: string;
  user: UserDTO;

  constructor(props: {
    id: string;
    title: string;
    content: string;
    memory: string;
    createdAt: Date;
    isbn: string;
    user: User;
  }) {
    this.id = props.id;
    this.title = props.title;
    this.content = props.content;
    this.memory = props.memory;
    this.createdAt = props.createdAt;
    this.isbn = props.isbn;
    this.user = new UserDTO(props.user);
  }
}
