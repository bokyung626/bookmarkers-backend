export class updateReviewDTO {
  id: string;
  title: string;
  content: string;
  memory: string;

  constructor(props: {
    id: string;
    title: string;
    content: string;
    memory: string;
  }) {
    this.id = props.id;
    this.title = props.title;
    this.content = props.content;
    this.memory = props.memory;
  }
}
