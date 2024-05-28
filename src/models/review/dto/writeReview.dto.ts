export class writeReviewDTO {
  isbn: string;
  title: string;
  content: string;
  memory: string;
  userId: string;

  constructor(props: {
    title: string;
    content: string;
    memory: string;
    userId: string;
    isbn: string;
  }) {
    this.title = props.title;
    this.content = props.content;
    this.memory = props.memory;
    this.userId = props.userId;
    this.isbn = props.isbn;
  }
}
