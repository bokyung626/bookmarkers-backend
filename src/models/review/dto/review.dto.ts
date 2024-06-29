import { Comment } from "comment";
import { User } from "user";
import { CommentDTO } from "../../comment/dto/comment.dto";
import { UserDTO } from "../../users/dto";

export class ReviewDTO {
  id: string;
  title: string;
  content: string;
  memory: string;
  image: string;
  createdAt: Date;
  isbn: string;
  user: UserDTO;
  comments: CommentDTO[];

  constructor(props: {
    id: string;
    title: string;
    content: string;
    image: string;
    memory: string;
    createdAt: Date;
    isbn: string;
    user: User;
    comments: Comment[];
  }) {
    this.id = props.id;
    this.title = props.title;
    this.content = props.content;
    this.memory = props.memory;
    this.image = props.image;
    this.createdAt = props.createdAt;
    this.isbn = props.isbn;
    this.user = new UserDTO(props.user);
    this.comments = props.comments.map((comment) => new CommentDTO(comment));
  }
}
