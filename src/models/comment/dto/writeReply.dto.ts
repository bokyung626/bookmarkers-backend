import { WriteReplyProps } from "comment";

export class writeReplyDTO {
  content: string;
  parentCommentId: string;
  userId: string;

  constructor(props: WriteReplyProps) {
    this.content = props.content;
    this.parentCommentId = props.parentCommentId;
    this.userId = props.userId;
  }
}
