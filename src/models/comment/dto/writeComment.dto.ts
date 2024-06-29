import { WriteCommentProps } from "comment";

export class writeCommentDTO {
  content: string;
  reviewId: string;
  userId: string;

  constructor(props: WriteCommentProps) {
    this.content = props.content;
    this.userId = props.userId;
    this.reviewId = props.reviewId;
  }
}
