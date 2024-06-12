export class UpdateCommentDTO {
  content: string;

  constructor(props: { content: string }) {
    this.content = props.content;
  }
}
