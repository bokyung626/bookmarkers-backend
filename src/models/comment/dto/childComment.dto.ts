import { User } from "user";
import { UserDTO } from "../../users/dto";

export class ChildCommentDTO {
  id: string;
  content: string;
  createdAt: Date;
  user: UserDTO;

  constructor(props: {
    id: string;
    content: string;
    createdAt: Date;
    user: User;
  }) {
    this.id = props.id;
    this.content = props.content;
    this.createdAt = props.createdAt;
    this.user = new UserDTO(props.user);
  }
}
