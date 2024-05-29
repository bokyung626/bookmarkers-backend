import { UserDTO } from "../../users/dto";

interface User {
  id: string;
  email: string;
  nickname: string;
  profileImage: string | null;
}

export class ReviewDTO {
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
